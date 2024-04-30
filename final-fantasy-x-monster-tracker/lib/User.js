export class User {
    constructor(uuid, name, email, create_date, last_modified_date) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.create_date = create_date;
        this.last_modified_date = last_modified_date;
    }
}