
const GET_ALL_FROM_USER = `SELECT * FROM public.user`
const CREATE_NEW_USER = `INSERT INTO public."user"(name, email, sub, userid) VALUES ($1, $2, $3, $4)`

module.exports = {
    GET_ALL_FROM_USER,
    CREATE_NEW_USER
}