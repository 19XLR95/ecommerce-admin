class User:
    def __init__(self, name, surname, email, password, _id = None):
        self._id = _id
        self.name = name
        self.surname = surname
        self.email = email
        self.password = password
