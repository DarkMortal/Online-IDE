import express, { Request, Response } from 'express';
import http from 'http';
import { v4 as uuidv4 } from 'uuid';

import { compile, Delete } from './compiler/compiler';

const app = express();
const server = http.createServer(app);

const PORT: number = Number(process.env.PORT) || 8000;

const frontend_root: string = __dirname + '/../frontend.build';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(frontend_root));

interface CompileRequestBody {
    lang: string;
    code: string;
    inputs?: string[];
}

app.post(
    '/compile',
    async (
        req: Request<{}, {}, CompileRequestBody>,
        res: Response
    ): Promise<void> => {
        const { lang, code, inputs } = req.body;
        const jobID: string = uuidv4();
        try {
            const data = await compile(code, lang, inputs || [], jobID);
            Delete(data[1]);
            res.json(data[0]);
        } catch (err) {
            res.json(err);
        }
    }
);

app.get('/', (_req: Request, res: Response) => {
    res.sendFile('./index.html', {
        root: frontend_root
    });
});

server.listen(PORT, () => {
    console.log(`Server is Running on Port : ${PORT}`);
});