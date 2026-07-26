import type { Entry } from "@/lib/types";
import { EntryHeader } from "./entry-header";
import { EntryBody } from "./entry-body";

export function EntryDetail({ entry, basePath, backLabel }: { entry: Entry; basePath: string; backLabel: string }) {
  return (
    <>
      <EntryHeader entry={entry} basePath={basePath} backLabel={backLabel} />
      <EntryBody entry={entry} />
    </>
  );
}
