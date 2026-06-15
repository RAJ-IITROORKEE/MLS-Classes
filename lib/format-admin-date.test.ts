import assert from "node:assert/strict";
import { formatAdminDate } from "./format-admin-date";

assert.equal(formatAdminDate("2026-05-20T23:30:00.000Z"), "5/20/2026");
assert.equal(formatAdminDate(new Date("2026-05-20T01:00:00.000Z")), "5/20/2026");
