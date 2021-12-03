const btn = document.getElementsByClassName("btn");
const even = document.getElementsByClassName("even");
const odd = document.getElementsByClassName("odd");

const resetLists = () => {
  const oddList = document.getElementsByClassName("odd-list");
  const evenList = document.getElementsByClassName("even-list");

  oddList[0].remove();
  evenList[0].remove();
  const newOddList = document.createElement("ul");
  const newEvenList = document.createElement("ul");
  newOddList.className = "odd-list";
  newEvenList.className = "even-list";
  odd[0].appendChild(newOddList);
  even[0].appendChild(newEvenList);
};
const generateNumbers = () => {
  const even = [];
  const odd = [];

  const arr = [...Array(20)].map(() => Math.floor(Math.random() * 100));

  arr.map((num) => {
    if (num % 2 === 0) {
      even.push(num);
    } else {
      odd.push(num);
    }
  });
  return { odd: odd.sort((a, b) => a > b), even: even.sort((a, b) => a > b) };
};
const populateList = (num, list) => {
  const node = document.createElement("li");
  node.innerHTML = num;
  list[0].appendChild(node);
};

const generateColumns = () => {
  resetLists();
  const oddList = document.getElementsByClassName("odd-list");
  const evenList = document.getElementsByClassName("even-list");
  const { odd, even } = generateNumbers();
  odd.map((num) => populateList(num, oddList));
  even.map((num) => populateList(num, evenList));
};

btn[0].addEventListener("click", generateColumns);
