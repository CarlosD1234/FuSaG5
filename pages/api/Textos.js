import { NextApiRequest, NextApiResponse } from "next";
import { promises } from "fs";
/**
 * @param { NextApiRequest } req
 * @param { NextApiResponse } res
 */

export default async (req, res) => {
    await promises.writeFile(req.body.name, req.body.data, {
        encoding: "utf-8",
    });

    res.send("OK");
};

