class FormatError extends Error {
    constructor(message) {
        super(message)
        this.name = 'FormatError'
    }
}

class AuthError extends Error {
    constructor(message) {
        super(message)
        this.name = AuthError
    }
}

class ExistenceError extends Error {
    constructor(message) {
        super(message)
        this.name = ExistenceError
    }
}

class ContentError extends Error {
    constructor(message) {
        super(message)
        this.name = ContentError
    }
}

class DuplicityError extends Error {
    constructor(message) {
        super(message)
        this.name = DuplicityError
    }
}

export default {
    ExistenceError, DuplicityError, ContentError, AuthError, FormatError
}