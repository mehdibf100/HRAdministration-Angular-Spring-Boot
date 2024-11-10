import { User } from "./user";
export enum LeaveReason{
    ANNUAL = 'ANNUAL',
    MEDICAL = 'MEDICAL',
    HOSPITALIZATION = 'HOSPITALIZATION',
    MARRIAGE = 'MARRIAGE',
    COMPASSIONATE = 'COMPASSIONATE',
    MATERNITY = 'MATERNITY',
    REPLACEMENT = 'REPLACEMENT',

}
export enum LeaveRequestStatus{
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',

}
export interface LeaveRequest {
    requestId?: number;
    user: User;
    reason: LeaveReason;
    startDate: string;
    endDate: string;
    status : LeaveRequestStatus;

}

