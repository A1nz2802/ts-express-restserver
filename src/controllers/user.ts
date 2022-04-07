import { RequestHandler } from 'express';

const getUser: RequestHandler<{},{},{},{nombre: string, apellidos: string, api_key: string}> = async( req, res ) => {

  const query = req.query;

  res.json({
    msg: 'GET - Api',
    ...query
  });
}

const postUser: RequestHandler<{},{},{name: string, age: number}> = async(req, res) => {

  const body = req.body;

  res.json({
    msg: 'POST - Api',
    body
  });
}

const putUser: RequestHandler<{id: string},{}> = async( req, res ) => {

  const { id } = req.params;

  res.json({
    msg: 'PUT - Api',
    id
  });
}

const patchUser: RequestHandler = async( req, res ) => {
  res.json({
    msg: 'PATCH - Api'
  });
}

const deleteUser: RequestHandler = async( req, res ) => {
  res.json({
    msg: 'DELETE - Api'
  });
}

export {
  getUser,
  postUser,
  putUser,
  patchUser,
  deleteUser,
}