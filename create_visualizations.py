"""
Create comprehensive PDF visualizations for all datasets
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from matplotlib.backends.backend_pdf import PdfPages
import json
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

# Set style
sns.set_style('whitegrid')
sns.set_palette('husl')
plt.rcParams['figure.figsize'] = (14, 10)
plt.rcParams['font.size'] = 10

def create_dashboard_visualizations(pdf):
    """Create visualizations for dashboard_sample_10.xls"""
    print("Creating dashboard sample visualizations...")
    
    df = pd.read_excel('/vercel/sandbox/uploads/dashboard_sample_10.xls')
    df['Date'] = pd.to_datetime(df['Date'])
    
    # Page 1: Overview Dashboard
    fig, axes = plt.subplots(2, 2, figsize=(14, 10))
    fig.suptitle('Dashboard Sample Analysis - Sales & Profit Overview', fontsize=16, fontweight='bold')
    
    # Sales by Product
    sales_by_product = df.groupby('Product')['Sales'].sum().sort_values(ascending=False)
    axes[0, 0].bar(sales_by_product.index, sales_by_product.values, color=sns.color_palette('viridis', len(sales_by_product)))
    axes[0, 0].set_title('Total Sales by Product', fontweight='bold')
    axes[0, 0].set_xlabel('Product')
    axes[0, 0].set_ylabel('Sales ($)')
    axes[0, 0].tick_params(axis='x', rotation=45)
    for i, v in enumerate(sales_by_product.values):
        axes[0, 0].text(i, v, f'${v:,.0f}', ha='center', va='bottom')
    
    # Profit by Product
    profit_by_product = df.groupby('Product')['Profit'].sum().sort_values(ascending=False)
    axes[0, 1].bar(profit_by_product.index, profit_by_product.values, color=sns.color_palette('rocket', len(profit_by_product)))
    axes[0, 1].set_title('Total Profit by Product', fontweight='bold')
    axes[0, 1].set_xlabel('Product')
    axes[0, 1].set_ylabel('Profit ($)')
    axes[0, 1].tick_params(axis='x', rotation=45)
    for i, v in enumerate(profit_by_product.values):
        axes[0, 1].text(i, v, f'${v:,.0f}', ha='center', va='bottom')
    
    # Sales by Region
    sales_by_region = df.groupby('Region')['Sales'].sum()
    colors = sns.color_palette('Set2', len(sales_by_region))
    axes[1, 0].pie(sales_by_region.values, labels=sales_by_region.index, autopct='%1.1f%%', 
                   colors=colors, startangle=90)
    axes[1, 0].set_title('Sales Distribution by Region', fontweight='bold')
    
    # Profit Margin by Product
    product_stats = df.groupby('Product').agg({'Sales': 'sum', 'Profit': 'sum'})
    product_stats['Margin'] = (product_stats['Profit'] / product_stats['Sales']) * 100
    axes[1, 1].barh(product_stats.index, product_stats['Margin'], color=sns.color_palette('mako', len(product_stats)))
    axes[1, 1].set_title('Profit Margin by Product (%)', fontweight='bold')
    axes[1, 1].set_xlabel('Profit Margin (%)')
    for i, v in enumerate(product_stats['Margin'].values):
        axes[1, 1].text(v, i, f'{v:.1f}%', va='center')
    
    plt.tight_layout()
    pdf.savefig(fig, dpi=300, bbox_inches='tight')
    plt.close()
    
    # Page 2: Detailed Metrics
    fig, axes = plt.subplots(2, 2, figsize=(14, 10))
    fig.suptitle('Dashboard Sample - Detailed Metrics', fontsize=16, fontweight='bold')
    
    # Daily Sales Trend
    df_sorted = df.sort_values('Date')
    axes[0, 0].plot(df_sorted['Date'], df_sorted['Sales'], marker='o', linewidth=2, markersize=8, color='#2E86AB')
    axes[0, 0].set_title('Daily Sales Trend', fontweight='bold')
    axes[0, 0].set_xlabel('Date')
    axes[0, 0].set_ylabel('Sales ($)')
    axes[0, 0].tick_params(axis='x', rotation=45)
    axes[0, 0].grid(True, alpha=0.3)
    
    # Daily Profit Trend
    axes[0, 1].plot(df_sorted['Date'], df_sorted['Profit'], marker='s', linewidth=2, markersize=8, color='#A23B72')
    axes[0, 1].set_title('Daily Profit Trend', fontweight='bold')
    axes[0, 1].set_xlabel('Date')
    axes[0, 1].set_ylabel('Profit ($)')
    axes[0, 1].tick_params(axis='x', rotation=45)
    axes[0, 1].grid(True, alpha=0.3)
    
    # Sales vs Profit Scatter
    axes[1, 0].scatter(df['Sales'], df['Profit'], s=200, alpha=0.6, c=range(len(df)), cmap='viridis')
    axes[1, 0].set_title('Sales vs Profit Correlation', fontweight='bold')
    axes[1, 0].set_xlabel('Sales ($)')
    axes[1, 0].set_ylabel('Profit ($)')
    axes[1, 0].grid(True, alpha=0.3)
    
    # Add trend line
    z = np.polyfit(df['Sales'], df['Profit'], 1)
    p = np.poly1d(z)
    axes[1, 0].plot(df['Sales'], p(df['Sales']), "r--", alpha=0.8, linewidth=2, label=f'Trend: y={z[0]:.3f}x+{z[1]:.1f}')
    axes[1, 0].legend()
    
    # Region Performance Comparison
    region_stats = df.groupby('Region').agg({'Sales': 'sum', 'Profit': 'sum'})
    x = np.arange(len(region_stats))
    width = 0.35
    axes[1, 1].bar(x - width/2, region_stats['Sales'], width, label='Sales', color='#06AED5')
    axes[1, 1].bar(x + width/2, region_stats['Profit'], width, label='Profit', color='#DD1C1A')
    axes[1, 1].set_title('Sales & Profit by Region', fontweight='bold')
    axes[1, 1].set_xlabel('Region')
    axes[1, 1].set_ylabel('Amount ($)')
    axes[1, 1].set_xticks(x)
    axes[1, 1].set_xticklabels(region_stats.index)
    axes[1, 1].legend()
    
    plt.tight_layout()
    pdf.savefig(fig, dpi=300, bbox_inches='tight')
    plt.close()

def create_nvidia_visualizations(pdf):
    """Create visualizations for NVIDIA stock data"""
    print("Creating NVIDIA stock visualizations...")
    
    df = pd.read_csv('/vercel/sandbox/uploads/NVidia_stock_history.csv')
    df['Date'] = pd.to_datetime(df['Date'], utc=True)
    df = df.sort_values('Date')
    df['Daily_Return'] = df['Close'].pct_change() * 100
    df['Year'] = df['Date'].dt.year
    
    # Page 1: Stock Price History
    fig, axes = plt.subplots(2, 2, figsize=(14, 10))
    fig.suptitle('NVIDIA Stock Analysis (1999-2003) - Price History', fontsize=16, fontweight='bold')
    
    # Closing Price Over Time
    axes[0, 0].plot(df['Date'], df['Close'], linewidth=1.5, color='#76B900', alpha=0.8)
    axes[0, 0].fill_between(df['Date'], df['Close'], alpha=0.3, color='#76B900')
    axes[0, 0].set_title('NVIDIA Closing Price Over Time', fontweight='bold')
    axes[0, 0].set_xlabel('Date')
    axes[0, 0].set_ylabel('Closing Price ($)')
    axes[0, 0].grid(True, alpha=0.3)
    
    # High-Low Range
    axes[0, 1].fill_between(df['Date'], df['Low'], df['High'], alpha=0.4, color='#FF6B35')
    axes[0, 1].plot(df['Date'], df['Close'], linewidth=1, color='#004E89', label='Close')
    axes[0, 1].set_title('Price Range (High-Low) with Closing Price', fontweight='bold')
    axes[0, 1].set_xlabel('Date')
    axes[0, 1].set_ylabel('Price ($)')
    axes[0, 1].legend()
    axes[0, 1].grid(True, alpha=0.3)
    
    # Volume Over Time
    axes[1, 0].bar(df['Date'], df['Volume'], width=1, color='#9B59B6', alpha=0.6)
    axes[1, 0].set_title('Trading Volume Over Time', fontweight='bold')
    axes[1, 0].set_xlabel('Date')
    axes[1, 0].set_ylabel('Volume')
    axes[1, 0].ticklabel_format(style='plain', axis='y')
    axes[1, 0].grid(True, alpha=0.3)
    
    # Daily Returns Distribution
    axes[1, 1].hist(df['Daily_Return'].dropna(), bins=50, color='#E74C3C', alpha=0.7, edgecolor='black')
    axes[1, 1].axvline(df['Daily_Return'].mean(), color='blue', linestyle='--', linewidth=2, label=f'Mean: {df["Daily_Return"].mean():.2f}%')
    axes[1, 1].set_title('Daily Returns Distribution', fontweight='bold')
    axes[1, 1].set_xlabel('Daily Return (%)')
    axes[1, 1].set_ylabel('Frequency')
    axes[1, 1].legend()
    axes[1, 1].grid(True, alpha=0.3)
    
    plt.tight_layout()
    pdf.savefig(fig, dpi=300, bbox_inches='tight')
    plt.close()
    
    # Page 2: Yearly Performance
    fig, axes = plt.subplots(2, 2, figsize=(14, 10))
    fig.suptitle('NVIDIA Stock Analysis - Yearly Performance', fontsize=16, fontweight='bold')
    
    # Yearly Average Closing Price
    yearly_avg = df.groupby('Year')['Close'].mean()
    axes[0, 0].bar(yearly_avg.index, yearly_avg.values, color=sns.color_palette('coolwarm', len(yearly_avg)))
    axes[0, 0].set_title('Average Closing Price by Year', fontweight='bold')
    axes[0, 0].set_xlabel('Year')
    axes[0, 0].set_ylabel('Average Price ($)')
    for i, v in enumerate(yearly_avg.values):
        axes[0, 0].text(yearly_avg.index[i], v, f'${v:.3f}', ha='center', va='bottom')
    
    # Yearly Total Volume
    yearly_volume = df.groupby('Year')['Volume'].sum()
    axes[0, 1].bar(yearly_volume.index, yearly_volume.values, color=sns.color_palette('viridis', len(yearly_volume)))
    axes[0, 1].set_title('Total Trading Volume by Year', fontweight='bold')
    axes[0, 1].set_xlabel('Year')
    axes[0, 1].set_ylabel('Total Volume')
    axes[0, 1].ticklabel_format(style='scientific', axis='y', scilimits=(0,0))
    
    # Yearly Price Range (Box Plot)
    yearly_data = [df[df['Year'] == year]['Close'].values for year in sorted(df['Year'].unique())]
    bp = axes[1, 0].boxplot(yearly_data, labels=sorted(df['Year'].unique()), patch_artist=True)
    for patch, color in zip(bp['boxes'], sns.color_palette('Set3', len(yearly_data))):
        patch.set_facecolor(color)
    axes[1, 0].set_title('Price Distribution by Year (Box Plot)', fontweight='bold')
    axes[1, 0].set_xlabel('Year')
    axes[1, 0].set_ylabel('Closing Price ($)')
    axes[1, 0].grid(True, alpha=0.3)
    
    # Yearly Returns
    yearly_returns = []
    years = sorted(df['Year'].unique())
    for year in years:
        year_data = df[df['Year'] == year].sort_values('Date')
        if len(year_data) > 1:
            first_close = year_data['Close'].iloc[0]
            last_close = year_data['Close'].iloc[-1]
            yearly_return = ((last_close - first_close) / first_close) * 100
            yearly_returns.append(yearly_return)
        else:
            yearly_returns.append(0)
    
    colors = ['green' if x > 0 else 'red' for x in yearly_returns]
    axes[1, 1].bar(years, yearly_returns, color=colors, alpha=0.7)
    axes[1, 1].axhline(y=0, color='black', linestyle='-', linewidth=0.5)
    axes[1, 1].set_title('Yearly Returns (%)', fontweight='bold')
    axes[1, 1].set_xlabel('Year')
    axes[1, 1].set_ylabel('Return (%)')
    for i, v in enumerate(yearly_returns):
        axes[1, 1].text(years[i], v, f'{v:.1f}%', ha='center', va='bottom' if v > 0 else 'top')
    
    plt.tight_layout()
    pdf.savefig(fig, dpi=300, bbox_inches='tight')
    plt.close()
    
    # Page 3: Advanced Stock Analysis
    fig, axes = plt.subplots(2, 2, figsize=(14, 10))
    fig.suptitle('NVIDIA Stock Analysis - Advanced Metrics', fontsize=16, fontweight='bold')
    
    # Moving Averages
    df['MA_50'] = df['Close'].rolling(window=50).mean()
    df['MA_200'] = df['Close'].rolling(window=200).mean()
    
    axes[0, 0].plot(df['Date'], df['Close'], linewidth=1, label='Close Price', alpha=0.7)
    axes[0, 0].plot(df['Date'], df['MA_50'], linewidth=2, label='50-Day MA', alpha=0.8)
    axes[0, 0].plot(df['Date'], df['MA_200'], linewidth=2, label='200-Day MA', alpha=0.8)
    axes[0, 0].set_title('Price with Moving Averages', fontweight='bold')
    axes[0, 0].set_xlabel('Date')
    axes[0, 0].set_ylabel('Price ($)')
    axes[0, 0].legend()
    axes[0, 0].grid(True, alpha=0.3)
    
    # Volatility (30-day rolling std of returns)
    df['Volatility'] = df['Daily_Return'].rolling(window=30).std()
    axes[0, 1].plot(df['Date'], df['Volatility'], linewidth=1.5, color='#E74C3C')
    axes[0, 1].fill_between(df['Date'], df['Volatility'], alpha=0.3, color='#E74C3C')
    axes[0, 1].set_title('30-Day Rolling Volatility', fontweight='bold')
    axes[0, 1].set_xlabel('Date')
    axes[0, 1].set_ylabel('Volatility (Std Dev of Returns)')
    axes[0, 1].grid(True, alpha=0.3)
    
    # Monthly Average Price Heatmap
    df['YearMonth'] = df['Date'].dt.to_period('M')
    monthly_avg = df.groupby('YearMonth')['Close'].mean().reset_index()
    monthly_avg['Year'] = monthly_avg['YearMonth'].dt.year
    monthly_avg['Month'] = monthly_avg['YearMonth'].dt.month
    
    pivot_data = monthly_avg.pivot(index='Month', columns='Year', values='Close')
    sns.heatmap(pivot_data, annot=True, fmt='.3f', cmap='YlOrRd', ax=axes[1, 0], cbar_kws={'label': 'Avg Price ($)'})
    axes[1, 0].set_title('Monthly Average Price Heatmap', fontweight='bold')
    axes[1, 0].set_xlabel('Year')
    axes[1, 0].set_ylabel('Month')
    
    # Cumulative Returns
    df['Cumulative_Return'] = (1 + df['Daily_Return']/100).cumprod() - 1
    axes[1, 1].plot(df['Date'], df['Cumulative_Return'] * 100, linewidth=2, color='#27AE60')
    axes[1, 1].fill_between(df['Date'], df['Cumulative_Return'] * 100, alpha=0.3, color='#27AE60')
    axes[1, 1].set_title('Cumulative Returns Over Time', fontweight='bold')
    axes[1, 1].set_xlabel('Date')
    axes[1, 1].set_ylabel('Cumulative Return (%)')
    axes[1, 1].grid(True, alpha=0.3)
    
    plt.tight_layout()
    pdf.savefig(fig, dpi=300, bbox_inches='tight')
    plt.close()

def create_employment_visualizations(pdf):
    """Create visualizations for employment data"""
    print("Creating employment data visualizations...")
    
    df = pd.read_csv('/vercel/sandbox/uploads/machine-readable-business-employment-data-jun-2025-quarter.csv')
    
    # Filter for Actual data only for cleaner visualization
    df_actual = df[df['Series_title_2'] == 'Actual'].copy()
    
    # Page 1: Industry Overview
    fig, axes = plt.subplots(2, 2, figsize=(14, 10))
    fig.suptitle('Business Employment Data - Industry Overview (Jun 2025)', fontsize=16, fontweight='bold')
    
    # Latest employment by industry
    latest_period = df_actual['Period'].max()
    latest_data = df_actual[df_actual['Period'] == latest_period]
    latest_by_industry = latest_data.groupby('Series_title_1')['Data_value'].sum().sort_values(ascending=False).head(10)
    
    axes[0, 0].barh(range(len(latest_by_industry)), latest_by_industry.values, color=sns.color_palette('tab10', len(latest_by_industry)))
    axes[0, 0].set_yticks(range(len(latest_by_industry)))
    axes[0, 0].set_yticklabels(latest_by_industry.index, fontsize=8)
    axes[0, 0].set_title(f'Top 10 Industries by Employment (Period: {latest_period})', fontweight='bold')
    axes[0, 0].set_xlabel('Filled Jobs')
    for i, v in enumerate(latest_by_industry.values):
        axes[0, 0].text(v, i, f'{v:,.0f}', va='center')
    
    # Employment distribution
    axes[0, 1].pie(latest_by_industry.head(8).values, labels=latest_by_industry.head(8).index, 
                   autopct='%1.1f%%', startangle=90)
    axes[0, 1].set_title('Employment Distribution (Top 8 Industries)', fontweight='bold')
    
    # Total employment over time
    total_by_period = df_actual.groupby('Period')['Data_value'].sum()
    axes[1, 0].plot(total_by_period.index, total_by_period.values, linewidth=2, marker='o', markersize=3, color='#3498DB')
    axes[1, 0].fill_between(total_by_period.index, total_by_period.values, alpha=0.3, color='#3498DB')
    axes[1, 0].set_title('Total Employment Over Time (All Industries)', fontweight='bold')
    axes[1, 0].set_xlabel('Period')
    axes[1, 0].set_ylabel('Total Filled Jobs')
    axes[1, 0].grid(True, alpha=0.3)
    axes[1, 0].ticklabel_format(style='plain', axis='y')
    
    # Growth rate by industry
    growth_rates = {}
    for industry in df_actual['Series_title_1'].unique()[:10]:
        industry_data = df_actual[df_actual['Series_title_1'] == industry].sort_values('Period')
        if len(industry_data) > 1:
            first_val = industry_data['Data_value'].iloc[0]
            last_val = industry_data['Data_value'].iloc[-1]
            growth = ((last_val - first_val) / first_val) * 100
            growth_rates[industry] = growth
    
    growth_df = pd.Series(growth_rates).sort_values(ascending=False).head(10)
    colors = ['green' if x > 0 else 'red' for x in growth_df.values]
    axes[1, 1].barh(range(len(growth_df)), growth_df.values, color=colors, alpha=0.7)
    axes[1, 1].set_yticks(range(len(growth_df)))
    axes[1, 1].set_yticklabels(growth_df.index, fontsize=8)
    axes[1, 1].set_title('Employment Growth Rate by Industry (%)', fontweight='bold')
    axes[1, 1].set_xlabel('Growth Rate (%)')
    axes[1, 1].axvline(x=0, color='black', linestyle='-', linewidth=0.5)
    for i, v in enumerate(growth_df.values):
        axes[1, 1].text(v, i, f'{v:.1f}%', va='center')
    
    plt.tight_layout()
    pdf.savefig(fig, dpi=300, bbox_inches='tight')
    plt.close()
    
    # Page 2: Industry Trends
    fig, axes = plt.subplots(2, 2, figsize=(14, 10))
    fig.suptitle('Business Employment Data - Industry Trends', fontsize=16, fontweight='bold')
    
    # Top 5 industries trend
    top_industries = latest_by_industry.head(5).index
    for industry in top_industries:
        industry_data = df_actual[df_actual['Series_title_1'] == industry].sort_values('Period')
        axes[0, 0].plot(industry_data['Period'], industry_data['Data_value'], 
                       marker='o', markersize=2, linewidth=1.5, label=industry[:30], alpha=0.8)
    
    axes[0, 0].set_title('Top 5 Industries - Employment Trends', fontweight='bold')
    axes[0, 0].set_xlabel('Period')
    axes[0, 0].set_ylabel('Filled Jobs')
    axes[0, 0].legend(fontsize=8, loc='best')
    axes[0, 0].grid(True, alpha=0.3)
    
    # Seasonality analysis - Average by quarter
    df_actual['Quarter'] = (df_actual['Period'] % 1 * 100).round(0).astype(int)
    quarter_avg = df_actual.groupby('Quarter')['Data_value'].mean()
    quarter_labels = {3: 'Q1 (Mar)', 6: 'Q2 (Jun)', 9: 'Q3 (Sep)', 12: 'Q4 (Dec)'}
    
    axes[0, 1].bar([quarter_labels.get(q, str(q)) for q in quarter_avg.index], 
                   quarter_avg.values, color=sns.color_palette('Set2', len(quarter_avg)))
    axes[0, 1].set_title('Average Employment by Quarter (Seasonality)', fontweight='bold')
    axes[0, 1].set_xlabel('Quarter')
    axes[0, 1].set_ylabel('Average Filled Jobs')
    for i, v in enumerate(quarter_avg.values):
        axes[0, 1].text(i, v, f'{v:,.0f}', ha='center', va='bottom')
    
    # Year-over-Year comparison for selected industry
    if len(top_industries) > 0:
        selected_industry = top_industries[0]
        industry_data = df_actual[df_actual['Series_title_1'] == selected_industry].copy()
        industry_data['Year'] = (industry_data['Period'] // 1).astype(int)
        industry_data['Quarter'] = (industry_data['Period'] % 1 * 100).round(0).astype(int)
        
        pivot_yoy = industry_data.pivot_table(values='Data_value', index='Quarter', columns='Year', aggfunc='mean')
        
        if len(pivot_yoy.columns) > 0:
            for year in pivot_yoy.columns[-5:]:  # Last 5 years
                axes[1, 0].plot([quarter_labels.get(q, str(q)) for q in pivot_yoy.index], 
                               pivot_yoy[year], marker='o', linewidth=2, label=str(year))
            
            axes[1, 0].set_title(f'Quarterly Trends: {selected_industry[:40]}', fontweight='bold')
            axes[1, 0].set_xlabel('Quarter')
            axes[1, 0].set_ylabel('Filled Jobs')
            axes[1, 0].legend()
            axes[1, 0].grid(True, alpha=0.3)
        else:
            axes[1, 0].text(0.5, 0.5, 'Insufficient data for quarterly trends', 
                           ha='center', va='center', transform=axes[1, 0].transAxes)
    else:
        axes[1, 0].text(0.5, 0.5, 'No industry data available', 
                       ha='center', va='center', transform=axes[1, 0].transAxes)
    
    # Industry comparison - latest vs earliest
    comparison_data = []
    for industry in df_actual['Series_title_1'].unique()[:10]:
        industry_data = df_actual[df_actual['Series_title_1'] == industry].sort_values('Period')
        if len(industry_data) > 1:
            comparison_data.append({
                'Industry': industry[:25],
                'Earliest': industry_data['Data_value'].iloc[0],
                'Latest': industry_data['Data_value'].iloc[-1]
            })
    
    if len(comparison_data) > 0:
        comp_df = pd.DataFrame(comparison_data)
        x = np.arange(len(comp_df))
        width = 0.35
        
        axes[1, 1].barh(x - width/2, comp_df['Earliest'], width, label='Earliest (2011)', color='#3498DB')
        axes[1, 1].barh(x + width/2, comp_df['Latest'], width, label='Latest (2025)', color='#E74C3C')
        axes[1, 1].set_yticks(x)
        axes[1, 1].set_yticklabels(comp_df['Industry'], fontsize=7)
        axes[1, 1].set_title('Employment: 2011 vs 2025 Comparison', fontweight='bold')
        axes[1, 1].set_xlabel('Filled Jobs')
        axes[1, 1].legend()
    else:
        axes[1, 1].text(0.5, 0.5, 'Insufficient data for comparison', 
                       ha='center', va='center', transform=axes[1, 1].transAxes)
    
    plt.tight_layout()
    pdf.savefig(fig, dpi=300, bbox_inches='tight')
    plt.close()

def create_combined_insights(pdf):
    """Create combined insights page"""
    print("Creating combined insights visualization...")
    
    fig = plt.figure(figsize=(14, 10))
    fig.suptitle('Multi-Dataset Analysis - Key Insights Summary', fontsize=16, fontweight='bold')
    
    # Create text summary
    ax = fig.add_subplot(111)
    ax.axis('off')
    
    # Load analysis results
    with open('/vercel/sandbox/analysis_results.json', 'r') as f:
        results = json.load(f)
    
    summary_text = """
    COMPREHENSIVE DATA ANALYSIS SUMMARY
    ═══════════════════════════════════════════════════════════════════════════
    
    📊 DATASET 1: Dashboard Sample (Sales & Profit Data)
    ───────────────────────────────────────────────────────────────────────────
    • Total Records: {dashboard_rows}
    • Date Range: {dashboard_dates}
    • Total Sales: ${total_sales:,}
    • Total Profit: ${total_profit:,}
    • Average Profit Margin: {profit_margin:.2f}%
    • Products Analyzed: {products}
    • Regions Covered: {regions}
    
    📈 DATASET 2: NVIDIA Stock History (1999-2003)
    ───────────────────────────────────────────────────────────────────────────
    • Total Trading Days: {nvidia_rows:,}
    • Date Range: {nvidia_dates}
    • Starting Price: ${nvidia_start:.4f}
    • Ending Price: ${nvidia_end:.4f}
    • Total Return: {nvidia_return:.2f}%
    • All-Time High: ${nvidia_high:.4f} on {nvidia_high_date}
    • All-Time Low: ${nvidia_low:.4f} on {nvidia_low_date}
    • Average Daily Volume: {nvidia_volume:,.0f}
    
    👥 DATASET 3: Business Employment Data (2011-2025)
    ───────────────────────────────────────────────────────────────────────────
    • Total Records: {employment_rows:,}
    • Period Range: {employment_period}
    • Industries Tracked: {employment_industries}
    • Average Filled Jobs: {employment_avg:,.0f}
    • Maximum Employment: {employment_max:,}
    • Data Categories: Actual, Seasonally Adjusted, Trend
    
    ═══════════════════════════════════════════════════════════════════════════
    Analysis Date: {analysis_date}
    ═══════════════════════════════════════════════════════════════════════════
    """.format(
        dashboard_rows=results['dashboard_sample']['total_rows'],
        dashboard_dates=f"{results['dashboard_sample']['date_range']['start']} to {results['dashboard_sample']['date_range']['end']}",
        total_sales=results['dashboard_sample']['sales_statistics']['total_sales'],
        total_profit=results['dashboard_sample']['profit_statistics']['total_profit'],
        profit_margin=results['dashboard_sample']['profit_statistics']['profit_margin_avg'],
        products=', '.join(results['dashboard_sample']['products']['unique_products']),
        regions=', '.join(results['dashboard_sample']['regions']['unique_regions']),
        nvidia_rows=results['nvidia_stock']['total_rows'],
        nvidia_dates=f"{results['nvidia_stock']['date_range']['start'][:10]} to {results['nvidia_stock']['date_range']['end'][:10]}",
        nvidia_start=results['nvidia_stock']['price_statistics']['closing_price']['first'],
        nvidia_end=results['nvidia_stock']['price_statistics']['closing_price']['last'],
        nvidia_return=results['nvidia_stock']['returns_analysis']['total_return_percent'],
        nvidia_high=results['nvidia_stock']['price_statistics']['high_price']['all_time_high'],
        nvidia_high_date=results['nvidia_stock']['price_statistics']['high_price']['date_of_high'][:10],
        nvidia_low=results['nvidia_stock']['price_statistics']['low_price']['all_time_low'],
        nvidia_low_date=results['nvidia_stock']['price_statistics']['low_price']['date_of_low'][:10],
        nvidia_volume=results['nvidia_stock']['volume_statistics']['average_volume'],
        employment_rows=results['employment_data']['total_rows'],
        employment_period=f"{results['employment_data']['period_range']['start']} to {results['employment_data']['period_range']['end']}",
        employment_industries=results['employment_data']['unique_values']['industries'],
        employment_avg=results['employment_data']['employment_statistics']['average_filled_jobs'],
        employment_max=results['employment_data']['employment_statistics']['max_filled_jobs'],
        analysis_date=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    )
    
    ax.text(0.05, 0.95, summary_text, transform=ax.transAxes, fontsize=9,
            verticalalignment='top', fontfamily='monospace',
            bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.3))
    
    plt.tight_layout()
    pdf.savefig(fig, dpi=300, bbox_inches='tight')
    plt.close()

def main():
    """Main function to create all visualizations"""
    print("\n" + "=" * 80)
    print("CREATING COMPREHENSIVE PDF VISUALIZATIONS")
    print("=" * 80)
    
    pdf_path = '/vercel/sandbox/data_analysis_visualizations.pdf'
    
    with PdfPages(pdf_path) as pdf:
        # Create summary page first
        create_combined_insights(pdf)
        
        # Create individual dataset visualizations
        create_dashboard_visualizations(pdf)
        create_nvidia_visualizations(pdf)
        create_employment_visualizations(pdf)
        
        # Add metadata
        d = pdf.infodict()
        d['Title'] = 'Comprehensive Data Analysis Report'
        d['Author'] = 'Blackbox Data Analysis'
        d['Subject'] = 'Multi-Dataset Analysis'
        d['Keywords'] = 'Sales, Stock Market, Employment, NVIDIA, Business Data'
        d['CreationDate'] = datetime.now()
    
    print("\n" + "=" * 80)
    print("PDF VISUALIZATION REPORT CREATED SUCCESSFULLY")
    print("=" * 80)
    print(f"Location: {pdf_path}")
    print("=" * 80)

if __name__ == "__main__":
    main()
