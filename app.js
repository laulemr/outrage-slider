const calmFeed = [
  {
    category: "Science",
    headline: "Decade-long study quietly maps how coastal soil stores carbon",
    outrage: 1
  },
  {
    category: "Local",
    headline: "City council approves modest budget for library renovations",
    outrage: 2
  },
  {
    category: "Culture",
    headline: "Community theatre opens thoughtful adaptation of classic play",
    outrage: 2
  },
  {
    category: "Economy",
    headline: "Analysts debate gradual shift in household spending patterns",
    outrage: 3
  },
  {
    category: "Politics",
    headline: "Committee releases detailed report on proposed voting reforms",
    outrage: 4
  }
];

const outrageFeed = [
  {
    category: "Politics",
    headline: "Lawmaker’s “disgraceful” remark sparks furious backlash overnight",
    outrage: 10
  },
  {
    category: "Culture",
    headline: "Critics “at war” over the year’s most divisive film",
    outrage: 8
  },
  {
    category: "Economy",
    headline: "Outrage grows as report exposes “shocking” pricing scheme",
    outrage: 9
  },
  {
    category: "Local",
    headline: "Residents furious after council meeting erupts over new proposal",
    outrage: 7
  },
  {
    category: "Science",
    headline: "Experts clash after controversial study challenges accepted advice",
    outrage: 6
  }
];

const feedList = document.querySelector("#feedList");
const slider = document.querySelector("#outrageSlider");
const score = document.querySelector("#score");
const hint = document.querySelector("#slider-help");

function getBlendedFeed(value) {
  const threshold = Number(value);

  const mixed = [...calmFeed, ...outrageFeed]
    .map((item) => {
      const distance = Math.abs(item.outrage - threshold);
      return {
        ...item,
        rankScore: 10 - distance + item.outrage * (threshold / 18)
      };
    })
    .sort((a, b) => b.rankScore - a.rankScore)
    .slice(0, 5);

  return mixed;
}

function renderFeed(value) {
  const items = getBlendedFeed(value);

  feedList.innerHTML = "";

  items.forEach((item, index) => {
    const li = document.createElement("li");

    const rank = document.createElement("span");
    rank.className = "rank";
    rank.textContent = String(index + 1).padStart(2, "0");

    const category = document.createElement("span");
    category.className = item.outrage >= 7 ? "category hot" : "category";
    category.textContent = item.category;

    const headline = document.createElement("span");
    headline.className = "headline";
    headline.textContent = item.headline;

    li.append(rank, category, headline);
    feedList.appendChild(li);
  });

  score.textContent = value;

  if (value <= 3) {
    hint.textContent = "Your feed favours calmer, lower-conflict items.";
  } else if (value <= 6) {
    hint.textContent = "Your feed is beginning to reward stronger reactions.";
  } else {
    hint.textContent = "Your feed now prioritises conflict, intensity, and outrage.";
  }
}

slider.addEventListener("input", (event) => {
  renderFeed(event.target.value);
});

renderFeed(slider.value);
