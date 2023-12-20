import { Service } from "typedi";
import ActivityRepository from "./activity.repository";
import { CreateActivityDto } from "./dto/create-activity.dto";
import { ActivityTypes } from "../activity-type/activity-type.type";
import { GetActivityDescriptionDto } from "./dto/get-activity-description.dto";


@Service()
export default class ActivityService{
    constructor(private readonly activityRepository:ActivityRepository){}

    create(dto:CreateActivityDto){
        return this.activityRepository.create(dto);
    }

    getAllByBoardId(boardId:string){
        return this.activityRepository.getAllByBoardId(boardId);
    }

    getAllByCardId(cardId:string){
        return this.activityRepository.getAllByCardId(cardId);
    }

    getActivityDescription(dto:GetActivityDescriptionDto){
        switch (dto.activityType){
            case ActivityTypes.ADD_CARD:
                return `${dto.userEmail} added ${dto.cardName} to ${dto.listName}`;
            case ActivityTypes.REMOVE_CARD:
                return `${dto.userEmail} removed ${dto.cardName} from ${dto.listName}`;
            case ActivityTypes.MOVE_CARD_TO_ANOTHER_LIST:
                return `${dto.userEmail} moved ${dto.cardName} to ${dto.listName}`;
            case ActivityTypes.ADD_COMMENT_TO_CARD:
                return `${dto.userEmail} added comment to  ${dto.cardName}`;
            case ActivityTypes.REMOVE_LIST:
                return `${dto.userEmail} removed ${dto.listName} from ${dto.boardName}`;
        }
    }

    deleteAllByBoardId(boardId:string){
        return this.activityRepository.deleteAllByBoardId(boardId);
    }
}