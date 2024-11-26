from flask import Flask, request, jsonify
import matplotlib
matplotlib.use('Agg')  # Set the backend to Agg for non-GUI environments
import matplotlib.pyplot as plt
import io
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/budget": {"origins": "http://localhost:5173"}})

# Main function to handle the budget allocation logic
def budget_planner(income, age, current_needs, current_wants, current_savings):
    # Ensure all inputs are converted to float or int as necessary
    try:
        income = float(income)
        age = int(age)
        current_needs = float(current_needs)
        current_wants = float(current_wants)
        current_savings = float(current_savings)
    except ValueError:
        return {"error": "Invalid input. Please provide numeric values."}, 400

    # Set allocation percentages
    if income <= 50000:
        needs_percentage = 50
        wants_percentage = 20
        savings_percentage = 30
    else:
        needs_percentage = 50
        wants_percentage = 30
        savings_percentage = 20

    # Calculate budget allocations, ensuring no negative values
    needs = max(0, income * needs_percentage / 100)
    wants = max(0, income * wants_percentage / 100)
    savings = max(0, income * savings_percentage / 100)

    # Plot initial allocation
    initial_allocation_img = plot_initial_allocation(needs, wants, savings, income)

    # Set goal and investments, ensuring no negative values
    primary_goal = 'investment'  # Default value, could be improved for user input
    equity_investment = 0
    other_investment = 0
    retirement_fund = 0
    emergency_fund = 0
    education_fund = 0

    if primary_goal == 'investment':
        total_investment = savings
        equity_investment = max(0, total_investment * (100 - age) / 100)
        other_investment = max(0, total_investment - equity_investment)
        investment_img = plot_investment_visualization(equity_investment, other_investment, income)
    elif primary_goal == 'education':
        education_fund = max(0, savings * 0.30)
        retirement_fund = max(0, savings * 0.40)
        emergency_fund = max(0, savings * 0.30)
        education_img = plot_education_visualization(education_fund, retirement_fund, emergency_fund, income)

    # Return all results as JSON
    results = {
        'needs': needs,
        'wants': wants,
        'savings': savings,
        'equity_investment': equity_investment,
        'other_investment': other_investment,
        'retirement_fund': retirement_fund,
        'emergency_fund': emergency_fund,
        'education_fund': education_fund,
        'initial_allocation_img': initial_allocation_img,
        'investment_img': investment_img if primary_goal == 'investment' else None,
        'education_img': education_img if primary_goal == 'education' else None,
    }

    return results

# Plotting functions
def plot_initial_allocation(needs, wants, savings, income):
    labels = ['Needs', 'Wants', 'Savings']
    sizes = [needs, wants, savings]
    colors = ['lightblue', 'lightgreen', 'lightcoral']
    explode = (0.1, 0, 0)

    plt.pie(sizes, explode=explode, labels=[f'{label} (₹{size:.2f}, {size/income*100:.1f}%)' for label, size in zip(labels, sizes)],
             colors=colors, autopct='%1.1f%%', shadow=True, startangle=140)
    plt.axis('equal')
    plt.title('Initial Allocation: Needs, Wants, and Savings')

    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    img_base64 = base64.b64encode(img.getvalue()).decode('utf8')
    plt.close()
    return img_base64

def plot_investment_visualization(equity_investment, other_investment, income):
    labels = ['Equity Investment', 'Other Investments']
    sizes = [equity_investment, other_investment]
    colors = ['gold', 'lightgreen']
    explode = (0.1, 0)

    plt.pie(sizes, explode=explode, labels=[f'{label} (₹{size:.2f}, {size/income*100:.1f}%)' for label, size in zip(labels, sizes)],
             colors=colors, autopct='%1.1f%%', shadow=True, startangle=140)
    plt.axis('equal')
    plt.title('Investment Allocation')

    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    img_base64 = base64.b64encode(img.getvalue()).decode('utf8')
    plt.close()
    return img_base64

def plot_education_visualization(education_fund, retirement_fund, emergency_fund, income):
    labels = ['Education Fund', 'Retirement Fund', 'Emergency Fund']
    sizes = [education_fund, retirement_fund, emergency_fund]
    colors = ['lightblue', 'lightcoral', 'lightgreen']
    explode = (0.1, 0, 0)

    plt.pie(sizes, explode=explode, labels=[f'{label} (₹{size:.2f}, {size/income*100:.1f}%)' for label, size in zip(labels, sizes)],
             colors=colors, autopct='%1.1f%%', shadow=True, startangle=140)
    plt.axis('equal')
    plt.title('Education Savings Allocation')

    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    img_base64 = base64.b64encode(img.getvalue()).decode('utf8')
    plt.close()
    return img_base64

# Flask routes
@app.route('/')
def home():
    return "Welcome to the Budget Calculator API!"

@app.route('/budget', methods=['GET'])
def get_budget():
    return "This is the budget page. Use POST to calculate your budget."

@app.route('/budget', methods=['POST'])
def budget():
    data = request.json
    income = data.get('income')
    age = data.get('age')
    current_needs = data.get('current_needs')
    current_wants = data.get('current_wants')
    current_savings = data.get('current_savings')

    results = budget_planner(income, age, current_needs, current_wants, current_savings)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
