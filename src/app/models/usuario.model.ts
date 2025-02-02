export class UserModel {
    public uid: string;
    public nombre: string;
    public email: string;
    constructor(_userId: string, _nombre: string, _email: string) {
        this.uid = _userId;
        this.nombre = _nombre;
        this.email = _email;
    }


    static fromFireBase(userFireBase: any) {
        return new UserModel(userFireBase.uid, userFireBase.nombre, userFireBase.email);
    }

}