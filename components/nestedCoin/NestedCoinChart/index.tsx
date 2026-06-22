import { useGetCoinMarketChart } from "@/hooks/useQueryHook";
import { formatCurrency } from "@/utils";
import React, { memo, useMemo, useState } from "react";
import { BarChart, LineChart } from "react-native-gifted-charts";
import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ChartDataItem = {
  value: number;
  label: string;
  frontColor: string;
  gradientColor: string;
  barWidth: number;
  spacing: number;
};

const PriceChartSection = ({
  coinId,
  currentPrice,
  priceChangePercentage24h,
  sparklinePrices,
}: {
  coinId: string;
  currentPrice?: number;
  priceChangePercentage24h?: number;
  sparklinePrices?: number[];
}) => {
  const [days, setDays] = useState(1);
  const [isLineChart, setIsLineChart] = useState(false);
  const timeframes = [1, 7, 30] as const;
  const chartWidth = Dimensions.get("window").width - 128;
  const { data: marketChartData = [], isLoading } = useGetCoinMarketChart(
    coinId,
    days,
  );

  const fallbackChartData = useMemo(() => {
    if (sparklinePrices?.length) {
      const now = Date.now();

      if (sparklinePrices.length === 1) {
        return [{ timestamp: now, price: sparklinePrices[0] }];
      }

      const step = (24 * 60 * 60 * 1000) / (sparklinePrices.length - 1);

      return sparklinePrices.map((price, index) => ({
        timestamp: now - (sparklinePrices.length - 1 - index) * step,
        price,
      }));
    }

    if (typeof currentPrice !== "number") return [];

    const change = priceChangePercentage24h ?? 0;

    return Array.from({ length: 24 }, (_, index) => {
      const progress = index / 23;
      const wave = Math.sin(progress * Math.PI * 4) * 0.015;

      return {
        timestamp: Date.now() - (23 - index) * 60 * 60 * 1000,
        price: currentPrice * (1 + (change / 100) * progress + wave),
      };
    });
  }, [currentPrice, priceChangePercentage24h, sparklinePrices]);

  const chartData = marketChartData.length ? marketChartData : fallbackChartData;

  const chartScale = useMemo(() => {
    if (!chartData.length) {
      return { min: 0, max: 1, range: 1 };
    }

    const min = Math.min(...chartData.map((point) => point.price));
    const max = Math.max(...chartData.map((point) => point.price));

    return {
      min,
      max,
      range: Math.max(max - min, max * 0.02, 1),
    };
  }, [chartData]);

  const axisPrices = useMemo(
    () =>
      Array.from({ length: 5 }, (_, index) => {
        return chartScale.min + chartScale.range * (index / 4);
      }),
    [chartScale],
  );

  const firstPrice = chartData[0]?.price;
  const lastPrice = chartData[chartData.length - 1]?.price;
  const priceChange =
    typeof firstPrice === "number" && typeof lastPrice === "number"
      ? lastPrice - firstPrice
      : 0;
  const isPositive = priceChange >= 0;
  const accentColor = isPositive ? "#00E5FF" : "#FF4D6D";
  const mutedBarColor = isPositive ? "#0F766E" : "#7F1D1D";
  const mutedGradientColor = isPositive ? "#14B8A6" : "#EF4444";

  const chartItems = useMemo<ChartDataItem[]>(() => {
    if (!chartData.length) return [];

    const rawMinPrice = chartScale.min;
    const range = chartScale.range;
    const labelStep = Math.max(1, Math.ceil(chartData.length / 5));

    return chartData.map((point, index) => {
      const previousPrice =
        index === 0 ? point.price : chartData[index - 1]?.price ?? point.price;
      const isUp = point.price >= previousPrice;

      return {
        value: ((point.price - rawMinPrice) / range) * 92 + 8,
        label:
          index === 0 ||
          index === chartData.length - 1 ||
          index % labelStep === 0
            ? formatChartLabel(point.timestamp, days)
            : "",
        frontColor: isUp ? accentColor : mutedBarColor,
        gradientColor: isUp ? accentColor : mutedGradientColor,
        barWidth: 10,
        spacing: 8,
      };
    });
  }, [chartData, chartScale, days, accentColor, mutedBarColor, mutedGradientColor]);

  const chartMaxValue = 110;
  const chartStepValue = chartMaxValue / 4;

  return (
    <View className="mt-4 rounded-3xl border border-white/5 bg-[#111827] p-3">
      <View className="mb-3 px-1">
        <View className="flex-row items-center justify-between gap-3">
          <View>
            <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wide">
              Price Movement
            </Text>
            <Text
              className={`text-sm font-extrabold ${isPositive ? "text-emerald-300" : "text-red-300"}`}
            >
              {isPositive ? "+" : ""}
              {formatCurrency(priceChange)}
            </Text>
          </View>

          <View className="flex-row gap-2">
            {timeframes.map((timeframe) => (
              <TouchableOpacity
                key={timeframe}
                onPress={() => setDays(timeframe)}
                className={`rounded-full border px-3 py-2 ${days === timeframe ? "bg-cyan-400/10" : "bg-[#1E293B]"}`}
                style={{
                  borderColor:
                    days === timeframe
                      ? accentColor
                      : "rgba(255,255,255,0.08)",
                }}
              >
                <Text
                  className={`text-xs font-extrabold ${days === timeframe ? "text-[#00E5FF]" : "text-gray-400"}`}
                >
                  {timeframe === 1 ? "1D" : timeframe === 7 ? "7D" : "30D"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mt-2 flex-row justify-end">
          <TouchableOpacity
            onPress={() => setIsLineChart((value) => !value)}
            className="rounded-full border border-white/5 bg-[#1E293B] px-3 py-2"
          >
            <Text className="text-xs font-extrabold text-[#00E5FF]">
              {isLineChart ? "Line Graph" : "Bar Graph"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row">
        <View className="w-12 items-center justify-center pr-1">
          {axisPrices.map((price, index) => (
            <Text
              key={`${price}-${index}`}
              className="text-gray-500 text-[9px]"
              style={{ height: 34, textAlignVertical: "center" }}
            >
              {formatCompactCurrency(price)}
            </Text>
          ))}
          <Text
            className="text-gray-400 text-[10px] font-extrabold uppercase"
            style={{
              position: "absolute",
              left: 0,
              top: 78,
              transform: [{ rotate: "-90deg" }],
            }}
          >
            Price
          </Text>
        </View>

        <View className="flex-1">
          {isLoading && !chartData.length ? (
            <View className="h-44 items-center justify-center">
              <ActivityIndicator size="large" color={accentColor} />
            </View>
          ) : chartItems.length ? isLineChart ? (
            <LineChart
              data={chartItems}
              height={170}
              width={chartWidth}
              noOfSections={4}
              maxValue={chartMaxValue}
              stepValue={chartStepValue}
              hideYAxisText
              yAxisLabelWidth={0}
              yAxisTextStyle={{ color: "#94A3B8", fontSize: 10 }}
              xAxisLabelTextStyle={{ color: "#94A3B8", fontSize: 10 }}
              xAxisIndicesHeight={2}
              xAxisIndicesWidth={4}
              xAxisIndicesColor="rgba(148,163,184,0.35)"
              yAxisColor="rgba(148,163,184,0.22)"
              yAxisThickness={1}
              xAxisColor="rgba(148,163,184,0.22)"
              xAxisThickness={1}
              rulesColor="rgba(148,163,184,0.16)"
              rulesLength={chartWidth}
              rulesThickness={0.7}
              rulesType="dashed"
              showVerticalLines
              verticalLinesColor="rgba(148,163,184,0.12)"
              verticalLinesThickness={0.7}
              verticalLinesHeight={160}
              verticalLinesSpacing={18}
              verticalLinesZIndex={-1}
              initialSpacing={10}
              endSpacing={10}
              spacing={8}
              color={accentColor}
              thickness={3}
              curved
              hideDataPoints
              areaChart
              startFillColor={accentColor}
              endFillColor={accentColor}
              startOpacity={0.28}
              endOpacity={0.02}
              isAnimated
              animationDuration={500}
              showScrollIndicator={false}
              nestedScrollEnabled
            />
          ) : (
            <BarChart
              data={chartItems}
              height={170}
              width={chartWidth}
              noOfSections={4}
              maxValue={chartMaxValue}
              stepValue={chartStepValue}
              hideYAxisText
              yAxisLabelWidth={0}
              yAxisTextStyle={{ color: "#94A3B8", fontSize: 10 }}
              xAxisLabelTextStyle={{ color: "#94A3B8", fontSize: 10 }}
              xAxisIndicesHeight={2}
              xAxisIndicesWidth={4}
              xAxisIndicesColor="rgba(148,163,184,0.35)"
              yAxisColor="rgba(148,163,184,0.22)"
              yAxisThickness={1}
              xAxisColor="rgba(148,163,184,0.22)"
              xAxisThickness={1}
              rulesColor="rgba(148,163,184,0.16)"
              rulesLength={chartWidth}
              rulesThickness={0.7}
              rulesType="dashed"
              showVerticalLines
              verticalLinesColor="rgba(148,163,184,0.12)"
              verticalLinesThickness={0.7}
              verticalLinesHeight={160}
              verticalLinesSpacing={18}
              verticalLinesZIndex={-1}
              initialSpacing={10}
              endSpacing={10}
              spacing={8}
              barWidth={10}
              frontColor={accentColor}
              gradientColor={accentColor}
              showGradient
              roundedTop
              roundedBottom
              isAnimated
              animationDuration={500}
              showScrollIndicator={false}
              nestedScrollEnabled
            />
          ) : (
            <View className="h-44 items-center justify-center">
              <Text className="text-gray-400 text-xs">No price data available</Text>
            </View>
          )}

          <Text className="mt-1 text-center text-gray-400 text-[10px] font-extrabold uppercase">
            Time →
          </Text>
        </View>
      </View>
    </View>
  );
};

const formatCompactCurrency = (value: number) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};

const formatChartLabel = (timestamp: number, days: number) => {
  const date = new Date(timestamp);

  if (days === 1) {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
};

export default memo(PriceChartSection);
