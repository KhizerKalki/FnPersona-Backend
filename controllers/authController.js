const User = require("../Models/user");

exports.signup = async (req, res) => {
  const { firstname, lastname, email, password, dateOfBirth, timezone } =
    req.body;
  try {
    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      dateOfBirth,
      timezone,
    });

    const token = user.generateJWT();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        timezone: user.timezone,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "User creation failed", details: error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.validPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateJWT();

    res.status(200).json({
      message: "Login successful",
      token,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      timezone: user.timezone,
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error });
  }
};
