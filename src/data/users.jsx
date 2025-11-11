const users = [
    { user: 'admin', pass: 'pass', role: 'admin', token: 'admin' },
    { user: 'user', pass: 'pass', role: 'user', token: 'user' },
    { user: 'guest', pass: 'pass', role: 'guest', token: 'guest' },
    { user: '1', pass: '1', role: 'tester', token: 'user' },
];

export function verifyUser(user, pass) {
    const userFound = users.find((u) => {
        return u.user === user && u.pass === pass;
    });

 
    return userFound ? { role: userFound.role, token: userFound.token } : null;
}
