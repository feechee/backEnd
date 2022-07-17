import { fork } from "child_process";
import path from "path";

const randomCtrl = {};

randomCtrl.renderNumbers = (req, res) => {
  const { cant } = req.params
  const computo = fork(
    path.resolve(process.cwd(), "./src/containers/random.js")
  );
  computo.send(cant);
  computo.on("message", (msg) => {
    res.render("random", {msg});
  });
};

randomCtrl.default = (req, res) => {
  const cant = 100000000
  const computo = fork(
    path.resolve(process.cwd(), "./src/containers/random.js")
  );
  computo.send(cant);
  computo.on("message", (msg) => {
    res.render("random", {msg});
  });
}

export default randomCtrl;
