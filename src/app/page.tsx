import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema";
import DriveContents from "./drive-contents";

export default async function GoogleDriveClone() {
  const files = await db.select().from(filesSchema);
  const folders = await db.select().from(foldersSchema);
  return <DriveContents files={files} folders={folders} />;
}
