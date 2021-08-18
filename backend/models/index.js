const Role = require("./role");
const User = require("./user");
const Class = require("./class");

const ROLES = ["admin", "guru", "pengurus", "siswa"];
const SUBJECTS = ["IPA", "IPS", "BAHASA"];

const createGradeClass = (length, subjectIDX) => {
  if (length > 1) {
    const dummyArray = Array.from(new Array(length));

    return dummyArray.map((_, idx) => `${SUBJECTS[subjectIDX]} ${++idx}`);
  }

  return `${SUBJECTS[subjectIDX]}`;
};

const currentAvailableClass = [
  {
    grade: {
      gradeNumber: 10,
      gradeName: "X",
      classNames: [
        ...createGradeClass(6, 0),
        ...createGradeClass(4, 1),
        createGradeClass(1, 2),
      ],
    },
  },
];

const initialize = async () => {
  await Role.estimatedDocumentCount(
    (err, count) =>
      !err &&
      count === 0 &&
      Role.insertMany(ROLES.map((name) => ({ name })))
        .then(() => console.log("Role ditambahkan"))
        .catch((e) => {
          console.error(`Error: ${e}`);
          process.exit();
        })
  );

  await Class.estimatedDocumentCount(async (err, count) => {
    if (!err && count === 0) {
      for (const { grade } of currentAvailableClass) {
        const newGrade = new Class({ ...grade });
        newGrade.classNames = grade.classNames;

        await newGrade.save();
      }

      console.log("Kelas ditambahkan");
    }
  });
};

module.exports = { Role, User, Class, ROLES, initialize };
