import dayjs from "dayjs";
import { SEX, USER_ROLE } from "../constants";
import { getUsers } from "../services/userServices";
import { checkNumberInRange } from "./number";
import { getDateToDisplay } from "./date";

export async function filterUsers({ sex, age, amount }) {
  const usersData = await getUsers({ role: USER_ROLE, _embed: "tickets" });
  const users = usersData.map((user) => {
    const { id, fullname, email, phonenumber, sex, birthday, tickets, fuid } =
      user;

    let amount = 0;
    let toMoney = 0;

    if (tickets) {
      for (const ticket of tickets) {
        amount += ticket.seats.length;
        toMoney += ticket.total;
      }
    }

    return {
      id,
      fullname,
      email,
      phonenumber,
      sex: SEX[sex],
      birthday: getDateToDisplay(birthday),
      amount,
      toMoney,
      fuid,
    };
  });
  return users.filter((user) => {
    return (
      (!sex || user.sex === SEX[sex]) &&
      checkNumberInRange(user.amount, amount) &&
      checkNumberInRange(
        -dayjs(user.birthday.split("/").reverse().join("-")).diff(
          Date.now(),
          "year",
        ),
        age,
      )
    );
  });
}
