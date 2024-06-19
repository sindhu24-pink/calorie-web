// Function to add a new food item input field
function addFoodItem() {
    const foodItemsDiv = document.getElementById('food-items');
    const newFoodItemDiv = document.createElement('div');
    newFoodItemDiv.classList.add('food-item', 'form-group');
    newFoodItemDiv.innerHTML = `
        <label for="food"><i class="fas fa-hamburger"></i> Food:</label>
        <input type="text" class="food" name="food" required>
        <label for="calories"><i class="fas fa-fire"></i> Calories:</label>
        <input type="number" class="calories" name="calories" required>
    `;
    foodItemsDiv.appendChild(newFoodItemDiv);
}

// Function to calculate BMI and total calories
function calculateBMIAndCalories() {
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const activity = document.getElementById('activity').value;

    if (age && gender && height && weight && activity) {
        const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
        let bmr;

        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        let activityFactor;
        switch (activity) {
            case 'sedentary':
                activityFactor = 1.2;
                break;
            case 'lightly active':
                activityFactor = 1.375;
                break;
            case 'moderately active':
                activityFactor = 1.55;
                break;
            case 'very active':
                activityFactor = 1.725;
                break;
            default:
                activityFactor = 1.0;
        }

        const dailyCalories = (bmr * activityFactor).toFixed(2);

        const foodItems = document.querySelectorAll('.food-item');
        let totalCalories = 0;

        foodItems.forEach(item => {
            const calories = item.querySelector('.calories').value;
            if (calories) {
                totalCalories += parseFloat(calories);
            }
        });

        const userResult = document.getElementById('user-result');
        userResult.innerHTML = '';  // Clear previous results

        const results = [
            { title: 'BMI', value: `${bmi}` },
            { title: 'Daily Caloric Needs', value: `${dailyCalories} calories` },
            { title: 'Total Calories from Food', value: `${totalCalories} calories` },
            { title: 'Tip', value: getDietSuggestion(bmi, totalCalories, dailyCalories), isTip: true }
        ];

        results.forEach(result => {
            const section = document.createElement('div');
            section.classList.add('section');
            if (result.isTip) {
                section.classList.add('tip');
            }

            const title = document.createElement('h3');
            title.textContent = result.title;
            section.appendChild(title);

            const value = document.createElement('p');
            value.textContent = result.value;
            section.appendChild(value);

            userResult.appendChild(section);
        });
    }
}

// Function to get diet suggestions based on BMI and calorie intake
function getDietSuggestion(bmi, totalCalories, dailyCalories) {
    let suggestion = '';
    if (totalCalories > dailyCalories) {
        suggestion = 'You have consumed more calories than your daily requirement. Consider reducing your intake.';
    } else if (totalCalories < dailyCalories) {
        suggestion = 'You have consumed fewer calories than your daily requirement. Consider increasing your intake.';
    } else {
        suggestion = 'You have consumed the exact number of calories as your daily requirement. Keep it up!';
    }

    if (bmi < 18.5) {
        suggestion += " YOU ARE UNDERWEIGHT. Breakfast: Greek yogurt with granola, berries, and honey. Morning Snack: Smoothie with whole milk, protein powder, spinach, banana, and almond butter. Lunch: Grilled chicken with quinoa, roasted vegetables, and a salad with olive oil dressing. Afternoon Snack: Trail mix with dried fruits and nuts. Evening Snack: Cottage cheese with pineapple chunks. Dinner: Baked salmon with brown rice, steamed asparagus,and a mixed green salad with nuts. Tip: Eat 5-6 small meals daily to increase calorie intake.";
    } else if (bmi < 24.9) {
        suggestion += " YOU ARE OVERWEIGHT. Breakfast: Overnight oats with chia seeds, berries, and a drizzle of honey. Morning Snack: Carrot sticks with hummus. Lunch: Grilled chicken salad with mixed greens, cherry tomatoes, cucumbers, bell peppers, and a light vinaigrette. Afternoon Snack: A small handful of almonds. Evening Snack: A small apple or a serving of mixed berries. Dinner: Baked cod with quinoa and steamed broccoli. Tip: Focus on portion control and include plenty of vegetables. Focus: Prioritize lean proteins, whole grains, and minimize added sugars and unhealthy fats.";
    } else {
        suggestion += " YOU ARE OBESE. Breakfast: Scrambled eggs with spinach and whole grain toast, accompanied by a glass of water or herbal tea. Mid-Morning Snack: Greek yogurt with sliced fruits like berries or a small portion of mixed nuts. Lunch: Grilled chicken breast or tofu with a large mixed salad (lettuce, tomatoes, cucumbers, carrots) dressed with olive oil and vinegar. Afternoon Snack: Raw vegetable sticks (carrots, bell peppers) with hummus or a small portion of air-popped popcorn. Dinner: Baked fish (salmon or cod) with quinoa or brown rice and steamed vegetables (broccoli, cauliflower). Evening Snack: A small bowl of cottage cheese with pineapple chunks or a piece of fruit. Tip: Drink plenty of water throughout the day and avoid sugary beverages. Focus: Incorporate lean proteins, whole grains, and plenty of fruits and vegetables, and limit processed foods and added sugars. Regular physical activity is also essential for weight management.";
    }

    return suggestion;
}
