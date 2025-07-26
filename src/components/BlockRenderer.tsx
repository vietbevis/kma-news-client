import { Block } from "@/global";
import AlumniBlock from "./blocks/AlumniBlock";
import CooperationBlock from "./blocks/CooperationBlock";
import EventBlock from "./blocks/EventBlock";
import NewsBlock from "./blocks/NewsBlock";
import SliderBlock from "./blocks/SliderBlock";
import TrainingBlock from "./blocks/TrainingBlock";

function renderBlock(block: Block, index: number) {
  switch (block.__component) {
    case "blocks.common-block":
      switch (block.variants) {
        case "news":
          return <NewsBlock {...block} key={index} />;
        case "slider":
          return <SliderBlock {...block} key={index} />;
        case "events":
          return <EventBlock {...block} key={index} />;
        case "trainning":
          return <TrainingBlock {...block} key={index} />;
        case "cooperation":
          return <CooperationBlock {...block} key={index} />;
        case "alumni":
          return <AlumniBlock {...block} key={index} />;
        default:
          return null;
      }
    default:
      return null;
  }
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) => renderBlock(block, index));
}
