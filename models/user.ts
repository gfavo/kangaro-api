export default interface User {
     name?: string;
     email: string;
     password: string;
     role: string;
     organizationName: string;
     organization_id?: number;
}

export interface SessionUser extends User {

}