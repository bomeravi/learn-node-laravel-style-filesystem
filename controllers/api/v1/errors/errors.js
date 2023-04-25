class ValidationError extends Error {
    constructor(message) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.code = 401;
    }
}



class NotFoundError extends Error {
    constructor(message) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.code = 404;

    }
}

class DataNotFoundError extends Error {
    constructor(message) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.code = 404;

    }
}

class UnauthorizedError extends  Error {
    constructor(message) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.code = 401;
    }
}

class DataPermissionError extends  Error {
    constructor(message) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.code = 403;
    }
}

class PermissionError extends  Error {
    constructor(message) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.code = 403;
    }
}

class SessionExpiredError extends Error {
    constructor(message) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.code = 401;
    }
}

class DatabaseError extends Error {
    constructor(message) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.code = 500;
    }
}
class LoginError extends Error {
    constructor(message) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.code = 500;
    }
}

export {
    ValidationError,
    NotFoundError,
    DataNotFoundError,
    UnauthorizedError,
    DatabaseError,
    LoginError,
    PermissionError,
    SessionExpiredError
}