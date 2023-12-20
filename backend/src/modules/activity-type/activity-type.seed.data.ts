import { v4 } from "uuid";
import { Prisma } from "../../../prisma/generated/client";
import { ActivityTypes } from "./activity-type.type";

class ActivityTypeSeedData {
    activityTypes: Prisma.ActivityTypeCreateInput[] = [];
    constructor() {
        for (const advertType of Object.values(ActivityTypes)) {
            this.activityTypes.push({
                id: v4(),
                name: advertType
            });
        }
    }
}

export const activityTypeSeedData = new ActivityTypeSeedData();