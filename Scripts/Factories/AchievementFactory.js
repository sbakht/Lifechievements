var AchievementFactory = function() {
    var achievements = [{ Title : 'The Salty Splatoon', Description : 'Eat 10 tablespoons of salt', Current : 6, Total : 10},
                            { Title : 'Waterboy In Training', Description : 'Clean 5 dishes',
                            Current : 1, Total : 5},
                            { Title : "First One's Free", "Description" : "Completed the mission 'My First Gun'",
                            Current : 1, Total : 1},
                            { Title : "Dragon Slayer", "Description" : "Completed the mission 'Best Minion Ever'",
                            Current : 1, Total : 1},
                            { Title : "Always Improving", "Description" : "Reached level 25",
                            Current : 25, Total : 25},
                            { Title : "Better Than Money", "Description" : "Purchased 5 items from the black market",
                            Current : 5, Total : 5},
                            { Title : "So Much Blood!", "Description" : "Gunzerked continuously for 90 seconds",
                            Current : 0, Total : 90},
                            { Title : "Girl's Gotta Eat", "Description" : "Fed thy noble queen 3 times during one visit to her quarters",
                            Current : 0, Total : 1},
                            { Title : "Highlands Explorer", "Description" : "Discovered all named locations in The Highlands, Thousand Cuts, and Wildlife Exploitation Preserve",
                            Current : 68, Total : 72},


      ];


    function getAchievementList() {
    	return achievements;
    }

	return {
		getAchievementList : getAchievementList,
	}
}