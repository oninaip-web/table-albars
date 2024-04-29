export interface IUsers {
	data: IUser[]
	totalCount: number
}

export interface IUser {
	personalCode: string
	fullName: string
	department?: string
	userStatus: string
	jobTitle?: string
	title: string
	code: string
	expiredDate: string
	status: string
}

export interface ISortData {
	personalCode: string
	data: IUser[]
}

export interface ISortedData {
	personalCode: string
	fullName: string
	department?: string
	userStatus: string
	jobTitle?: string
	healthChecks: IHealthChecks[]
}

export interface IHealthChecks {
	title: string
	code: string
	expiredDate: string
	status: string
}
