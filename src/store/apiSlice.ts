import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ProgramByEmail } from '../models/Programs';
import type { IUser } from '../models/User';

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_API_URL || 'https://sport-blueprint-api-310298945951.us-central1.run.app/api',
	credentials: 'include', // для работы с cookie
});

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery,
	tagTypes: ['User', 'Program'],
	endpoints: (builder) => ({
		// Auth endpoints
		fetchMe: builder.query<IUser, void>({
			query: () => '/auth/me',
			providesTags: ['User'],
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: '/auth/logout',
				method: 'GET',
			}),
			invalidatesTags: ['User'],
		}),
		// Program endpoints
		getProgramMe: builder.query<ProgramByEmail[], void>({
			query: () => '/programs/me',
			providesTags: ['Program'],
		}),
		getProgramMeActive: builder.query<ProgramByEmail, void>({
			query: () => '/programs/me/active',
			providesTags: ['Program'],
		}),
		// Update exercise data (weight, count, comments)
		updateExercise: builder.mutation<
			void,
			{
				programId: string;
				exerciseId: string;
				weight?: number;
				count?: number;
				comments?: string;
			}
		>({
			query: ({ programId, exerciseId, weight, count, comments }) => ({
				url: `/programs/${programId}/exercise`,
				method: 'PATCH',
				body: {
					exerciseId,
					...(weight !== undefined && { weight }),
					...(count !== undefined && { count }),
					...(comments !== undefined && { comments }),
				},
			}),
			// Оптимистичное обновление кеша
			async onQueryStarted({ exerciseId, weight, count, comments }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					apiSlice.util.updateQueryData('getProgramMeActive', undefined, (draft) => {
						// Находим упражнение и обновляем его
						draft.phases?.forEach((phase) => {
							phase.weeks?.forEach((week) => {
								week.days?.forEach((day) => {
									const exercise = day.exercises?.find((ex) => ex._id === exerciseId);
									if (exercise) {
										if (weight !== undefined) exercise.weight = weight;
										if (count !== undefined) exercise.count = count;
										if (comments !== undefined) exercise.comments = comments;
									}
								});
							});
						});
					})
				);
				
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
			invalidatesTags: ['Program'],
		}),
		// Update day comments
		updateDayComments: builder.mutation<
			void,
			{
				programId: string;
				dayId: string;
				comments: string;
			}
		>({
			query: ({ programId, dayId, comments }) => ({
				url: `/programs/${programId}/day`,
				method: 'PATCH',
				body: {
					dayId,
					comments,
				},
			}),
			// Оптимистичное обновление кеша
			async onQueryStarted({ dayId, comments }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					apiSlice.util.updateQueryData('getProgramMeActive', undefined, (draft) => {
						// Находим день и обновляем комментарии
						draft.phases?.forEach((phase) => {
							phase.weeks?.forEach((week) => {
								const day = week.days?.find((d) => d._id === dayId);
								if (day) {
									day.comments = comments;
								}
							});
						});
					})
				);
				
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
			invalidatesTags: ['Program'],
		}),
	}),
});

// Export hooks for usage in functional components
export const {
	useFetchMeQuery,
	useLogoutMutation,
	useGetProgramMeQuery,
	useGetProgramMeActiveQuery,
	useUpdateExerciseMutation,
	useUpdateDayCommentsMutation,
} = apiSlice;
