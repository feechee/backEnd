import { fork } from "child_process";
import path from "path";
import logger from "../utils/logger.js";

const randomCtrl = {};

randomCtrl.renderNumbers = (req, res) => {
  logger.info('Petición en ruta /randoms')
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
  logger.info('Petición en ruta /randoms')
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
