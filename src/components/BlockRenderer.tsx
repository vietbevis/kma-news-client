import { Block, SemesterProps, SubjectTypeProps } from "@/global";
import AlumniBlock from "./blocks/AlumniBlock";
import BlockDescription from "./blocks/BlockDescription";
import CooperationBlock from "./blocks/CooperationBlock";
import EventBlock from "./blocks/EventBlock";
import NewsBlock from "./blocks/NewsBlock";
import SemesterBlock from "./blocks/SemesterBlock";
import SliderBlock from "./blocks/SliderBlock";
import TrainingBlock from "./blocks/TrainingBlock";

function renderBlock(
  block: Block,
  index: number,
  subjectType?: SubjectTypeProps[],
  semesters?: SemesterProps[]
) {
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
    case "blocks.semester-block":
      return (
        <SemesterBlock
          data={block}
          key={index}
          id={index}
          subjectType={subjectType}
          semesters={semesters}
        />
      );
    case "elements.block-description":
      return <BlockDescription {...block} key={index} id={index} />;
    default:
      return null;
  }
}

export function BlockRenderer({
  blocks,
  subjectType,
  semesters,
}: {
  blocks: Block[];
  subjectType?: SubjectTypeProps[];
  semesters?: SemesterProps[];
}) {
  return blocks.map((block, index) =>
    renderBlock(block, index, subjectType, semesters)
  );
}
