import { Router } from 'express';


const router = Router();

router.get('/', (req, res) => {
    console.log('Hello World!'); // affiche 'Hello World!' dans la console
    res.send('Hello World!');
  });

  export default router;