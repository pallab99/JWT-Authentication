export const post = [
  {
    userName: "pallab",
    title: "post 1",
  },
  {
    userName: "pallab 1",
    title: "post 2",
  },
  {
    userName: "abc",
    title: "abc post",
  },
];

export const getPostByUSer = (req, res) => {
  res.json(post.filter((post) => post.userName === req.user.name));
};
