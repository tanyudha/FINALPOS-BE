import protect_route from "./protect_route";

const authorized_for = (role: string | string[]) => {
  if (typeof role === "object") {
    role = role.toString();
  }
  return (
    authorized_for[role] ||
    (authorized_for[role] = function (req, res, next) {
      protect_route(req, res, () => {
        try {
          if (!role.includes(req.user.role))
            throw new Error("Anda tidak memiliki akses untuk tindakan ini.");
          next();
        } catch (err) {
          res.status(403).json({
            status: "failed",
            message: err.message,
          });
        }
      });
    })
  );
};

export default authorized_for;
