import './rightbar.css';

const newsList = [
  'this is news 1 that it is been seen that nothing',
  'this is news 2 that it is been seen that nothing',
  'this is news 3 that it is been seen that nothing',
  'this is news 4 that it is been seen that nothing',
  'this is news 5 that it is been seen that nothing',
  'this is news 6 that it is been seen that nothing',
  'this is news 7 that it is been seen that nothing',
];

const birthdayChoices = [
  'Raghav Agarwal',
  'Sahil Dawara',
  'Vishal Garg',
  'Deepesh Grover',
  'Apoorva Dawara',
  'Rajat Chandra',
  'Tushar Saini',
  'Himanshu Saini',
  'Rishab Kaushik',
  'Ashwin Jagarwal',
  'Tushar Arora',
];

export default function Rightbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const randomIndex =
    Math.floor(Math.random() * (birthdayChoices.length - 1) + 1) - 1;
  return (
    <div className="rightbar">
      <div className="rightBarTop">
        <img src={PF + 'images/gift.png'} alt="" className="giftIcon" />
        <span className="birthdayText">
          Today is <b>{birthdayChoices[randomIndex]}'s</b> birthday.
        </span>
      </div>
      <a href="#someLink">
        <img src={PF + 'images/advertisement.png'} alt="" className="adImage" />
      </a>
      <div className="rightBarBottom">
        <span className="newsText">
          <b>Latest News</b>
        </span>
        {newsList.map((n, index) => {
          return (
            <span key={index.toString()} className="newsDescription">
              {n}
            </span>
          );
        })}
      </div>
    </div>
  );
}
