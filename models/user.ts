export default interface User {
     id?: number;
     name?: string;
     email: string;
     password: string;
     role: string;
     organizationName: string;
     organization_id?: number;
     active?: boolean;
}

export interface SessionUser extends User {

}