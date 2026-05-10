import { ROUTE_LIST } from "@/constants";
import RecieveImg from "../assets/images/svgs/arrow-sell.svg";
import SellImage from "../assets/images/svgs/buy-tag.svg";
import BuyImage from "../assets/images/svgs/plus-sign.svg";
import SendImage from "../assets/images/svgs/send-tab.svg";

export const HOME_OPERATION_DATA = [
  {
    id: "1",
    name: "Buy",
    image: BuyImage,
    onPress: () => ROUTE_LIST.TRADE_SCREEN,
  },
  {
    id: "2",
    name: "Sell",
    image: SellImage,
    onPress: () => console.log("Sell Pressed"),
  },
  {
    id: "3",
    name: "Send",
    image: SendImage,
    onPress: () => console.log("Buy Pressed"),
  },
  {
    id: "4",
    name: "Receive",
    image: RecieveImg,
    onPress: () => console.log("Sell Pressed"),
  },
];
