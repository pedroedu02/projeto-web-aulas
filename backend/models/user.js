import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Informe seu nome"],
      maxLength: [
        50,
        "Seu nome não pode ultrapassar o limite de 50 caracteres",
      ],
    },
    email: {
      type: String,
      required: [true, "Informe seu e-mail"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Informe sua senha"],
      minLength: [6, "Sua senha não pode ser menor que 6 caracteres"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

//Criptografando a senha antes de salvar no BD
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//Retornando o Token JWT
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

//Comparação da senha informada pelo usuário e a senha do banco de dados
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
