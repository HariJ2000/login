
const GET_ALL_FROM_USER = `SELECT * FROM public.user`
const CREATE_NEW_USER = `INSERT INTO public."user"(name, email, sub) VALUES ($1, $2, $3) RETURNING userid`

module.exports = {
    GET_ALL_FROM_USER,
    CREATE_NEW_USER
}