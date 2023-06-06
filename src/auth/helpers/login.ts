import { MongodbService } from "src/mongodb/mongodb.service";
import { LogInDto } from "../dto/log-in.dto";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "src/lib/firebase";

export const loginUser = async (dto: LogInDto, db: MongodbService) => {
    try
    {
        const user = await signInWithEmailAndPassword(auth, dto.email, dto.password);
        const token = await user.user.getIdToken();

        return {bearer: token};
    }
    catch(err)
    {
        throw err;
    }
}