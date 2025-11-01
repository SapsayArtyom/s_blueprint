export type SetP = {
    count: number;
    reps?: number;
    rpe?: number;
    restSec?: number;
};

export type Exercise = {
	slug: string;
	name: string;
	link: string;
}

export type ExP = {
	_id?: string; // ID упражнения для обновлений
	exercise: Exercise; 
	notes?: string; 
	sets: SetP; 
	count?: number; 
	weight?: number; 
	prevWeight?: number; 
	comments?: string;
};

export type DayP = {
	_id?: string; // ID дня для обновлений
	dayOfWeek?: number; 
	title?: string; 
	plannedDate?: string; 
	exercises: ExP[]; 
	comments?: string;
};

export type WeekP = {
	_id?: string; // ID недели
	weekNumber: number; 
	days: DayP[];
};

export type PhaseP = {
	_id?: string; // ID фазы
    name: string;
    order: number;
    durationWeeks: number;
    startDate?: string;
    weeks: WeekP[];
};

export type ProgramByEmail = {
	_id?: string; // ID программы
    email: string; // владелец
    title: string;
    isActive?: boolean;
    phases: PhaseP[];
};