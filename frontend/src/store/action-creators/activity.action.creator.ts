import { Dispatch, useCallback, useState } from "react";
import { ActivityAction } from "../reducers/activity/activity.action.interface";
import { ActivityService } from "../../services/activity/activity.service";
import { setActivitiesAction } from "../reducers/activity/activity.action";
import { AxiosError } from "axios";

export const useActivity = () => {
    const [isReady, setIsReady] = useState(false);

    const getActivitiesByBoard = useCallback((boardId: string) => {
        return async (dispatch: Dispatch<ActivityAction>) => {
            try {
                setIsReady(false);
                const token = localStorage.getItem('token');
                const response = await ActivityService.getAllByBoardId(token, boardId);
                dispatch(setActivitiesAction(response.data.activities));
                return response;
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error.response?.data.message);
                }
            } finally {
                setIsReady(true);
            }
        }
    }, []);

    const getActivitiesByCard = useCallback((cardId:string) => {
        return async (dispatch: Dispatch<ActivityAction>) => {
            try {
                setIsReady(false);
                const token = localStorage.getItem('token');
                const response = await ActivityService.getAllByCardId(token, cardId);
                dispatch(setActivitiesAction(response.data.activities));
                return response;
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error.response?.data.message);
                }
            } finally {
                setIsReady(true);
            }
        }
    }, []);

    return {
        isReady,
        getActivitiesByBoard,
        getActivitiesByCard
    }
}