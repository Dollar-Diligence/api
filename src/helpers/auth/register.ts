import { MongodbService } from 'src/mongodb/mongodb.service';
import { auth } from 'src/lib/admin';
import { RegisterDto } from 'src/auth/dto/register.dto';

export const registerUser = async (dto: RegisterDto, db: MongodbService) => {
  try {
    const lowerCaseEmail = dto.email.toLowerCase();
    const lowerCaseUserName = dto.userName.toLowerCase();

    virfyUsername(lowerCaseUserName);
    const validEmail = isValidEmail(lowerCaseEmail);
    verifyPassword(dto.password);

    if (!validEmail) {
      throw new Error('Invalid email');
    }

    const accountsCollection = db.getCollection('accounts');

    const existingAccount = await accountsCollection.findOne({
      email: lowerCaseEmail,
    });
    if (existingAccount) {
      throw new Error('Email already exists');
    }

    const existingUserName = await accountsCollection.findOne({
      userName: lowerCaseUserName,
    });
    if (existingUserName) {
      throw new Error('Username already exists');
    }

    const fbUser = await auth.createUser({
        email: lowerCaseEmail,
        emailVerified: false,
        password: dto.password,
        displayName: lowerCaseUserName,
        })

    const account = {
      uid: fbUser.uid,
      userName: lowerCaseUserName,
      email: lowerCaseEmail,
      createAt: new Date(),
    };

    const result = await accountsCollection.insertOne(account);

    return result;
  } catch (err) {
    throw err;
  }
};



const virfyUsername = (userName: string) => {
  if (userName.length < 3) {
    throw new Error('Username must be at least 3 characters long');
  }

  if (userName.length > 20) {
    throw new Error('Username must be less than 20 characters long');
  }

  if (!/^[a-zA-Z0-9]+$/.test(userName)) {
    throw new Error('Username can only contain letters and numbers');
  }

  return true;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const verifyPassword = (password: string) => {
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }

  if (password.length > 100) {
    throw new Error('Password must be less than 100 characters long');
  }

  return true;
};
