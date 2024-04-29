export interface IUsers {
	data: IUser[]
	totalCount: number
}

export interface IUser {
	id: number
	fullName: string
	department?: string
	userStatus: string
	jobTitle?: string
	healthChecks: IHealthCheck[]
}

export interface IHealthCheck {
	title: string
	code: string
	expiredDate: string
	status: string
}
