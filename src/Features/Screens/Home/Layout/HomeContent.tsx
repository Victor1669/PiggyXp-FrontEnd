import Section from "../Components/Section";

export default function HomeContent({ sections }: { sections: any[] }) {
  return (
    <>
      {sections.map((section, i) => (
        <Section key={i} title={sections[0].title} />
      ))}
    </>
  );
}
