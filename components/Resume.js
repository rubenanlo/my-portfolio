import Image from "next/image";
import { Container } from "components/Container";
import { Button } from "components/Button";
import { TextLayout } from "components/TextLayout";
import { BriefcaseIcon, ArrowDownIcon } from "library/appIcons";
import resume from "library/resume";

const Role = ({ item: role }) => {
  return (
    <>
      <Container.Flex
        className={{
          position: "relative",
          flex: "shrink-0 flex-none items-center justify-center",
          dimension: "mt-1 h-10 w-10",
          background: "dark:bg-zinc-800",
          border: "dark:border dark:border-zinc-700/50",
          ring: "ring-1 ring-zinc-900/5 dark:ring-0",
          otherStyles: "rounded-full shadow-md shadow-zinc-800/5",
        }}
      >
        <Image
          src={role.logo}
          alt=""
          className="h-10 w-10 rounded-full"
          unoptimized
        />
      </Container.Flex>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400 w-[9.3rem]">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500 self-start"
          aria-label={`${role.start} until ${role.end}`}
        >
          {`${role.start} - ${role.end}`}
        </dd>
      </dl>
    </>
  );
};

const Resume = () => (
  <Container className="p-6 rounded-2xl border border-zinc-100 dark:border-zinc-700/40">
    <TextLayout.Title
      as="h4"
      className="flex"
      AdditionalComponent={<BriefcaseIcon className="h-6 w-6 flex-none mr-3" />}
      title="Work"
    />
    <Container.List
      list={resume}
      as={{
        parent: "ul",
        child: "li",
      }}
      className={{
        parent: {
          dimension: "mt-6 space-y-4",
        },
        child: {
          flex: "flex gap-4",
        },
      }}
      AdditionalComponent={Role}
      variant="array"
    />
    <Container.Link href="docs/resume.pdf" target="_blank">
      <Button
        variant="secondary"
        className={{ dimension: "mt-6 w-full", otherStyles: "group" }}
      >
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </Container.Link>
  </Container>
);

export default Resume;
