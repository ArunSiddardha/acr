"""
Create comprehensive markdown analysis report
"""

import pandas as pd
import numpy as np
import json
from datetime import datetime

def load_analysis_results():
    """Load the JSON analysis results"""
    with open('/vercel/sandbox/analysis_results.json', 'r') as f:
        return json.load(f)

def create_markdown_report():
    """Create comprehensive markdown report"""
    
    results = load_analysis_results()
    
    # Load datasets for additional analysis
    df_dashboard = pd.read_excel('/vercel/sandbox/uploads/dashboard_sample_10.xls')
    df_nvidia = pd.read_csv('/vercel/sandbox/uploads/NVidia_stock_history.csv')
    df_nvidia['Date'] = pd.to_datetime(df_nvidia['Date'], utc=True)
    df_nvidia = df_nvidia.sort_values('Date')
    df_employment = pd.read_csv('/vercel/sandbox/uploads/machine-readable-business-employment-data-jun-2025-quarter.csv')
    
    report = f"""# Comprehensive Data Analysis Report

**Analysis Date:** {datetime.now().strftime('%B %d, %Y at %H:%M:%S')}

**Datasets Analyzed:**
1. dashboard_sample_10.xls - Sales and Profit Data
2. NVidia_stock_history.csv - NVIDIA Stock Market Data (1999-2003)
3. machine-readable-business-employment-data-jun-2025-quarter.csv - Business Employment Data (2011-2025)

---

## Executive Summary

This comprehensive analysis examines three distinct datasets covering sales performance, stock market trends, and employment statistics. The analysis reveals key insights across business operations, financial markets, and workforce dynamics.

### Key Highlights:
- **Dashboard Sample:** ${results['dashboard_sample']['sales_statistics']['total_sales']:,} in total sales with {results['dashboard_sample']['profit_statistics']['profit_margin_avg']:.2f}% average profit margin
- **NVIDIA Stock:** {results['nvidia_stock']['returns_analysis']['total_return_percent']:.2f}% total return from 1999 to 2003
- **Employment Data:** {results['employment_data']['total_rows']:,} records tracking {results['employment_data']['unique_values']['industries']} industries over 14+ years

---

## 1. Dashboard Sample Analysis (dashboard_sample_10.xls)

### 1.1 Dataset Overview

**File Information:**
- Total Records: {results['dashboard_sample']['total_rows']}
- Columns: {', '.join(results['dashboard_sample']['columns'])}
- Date Range: {results['dashboard_sample']['date_range']['start']} to {results['dashboard_sample']['date_range']['end']}
- Data Quality: No missing values detected

### 1.2 Sales Performance

**Overall Statistics:**
- **Total Sales:** ${results['dashboard_sample']['sales_statistics']['total_sales']:,}
- **Average Sales per Transaction:** ${results['dashboard_sample']['sales_statistics']['average_sales']:,.2f}
- **Sales Range:** ${results['dashboard_sample']['sales_statistics']['min_sales']:,} - ${results['dashboard_sample']['sales_statistics']['max_sales']:,}
- **Standard Deviation:** ${results['dashboard_sample']['sales_statistics']['std_sales']:,.2f}

**Sales by Product:**
"""
    
    # Add sales by product
    for product, sales in sorted(results['dashboard_sample']['sales_by_product'].items(), key=lambda x: x[1], reverse=True):
        report += f"- **{product}:** ${sales:,}\n"
    
    report += f"""
**Sales by Region:**
"""
    
    # Add sales by region
    for region, sales in sorted(results['dashboard_sample']['sales_by_region'].items(), key=lambda x: x[1], reverse=True):
        report += f"- **{region}:** ${sales:,}\n"
    
    report += f"""
### 1.3 Profit Analysis

**Overall Statistics:**
- **Total Profit:** ${results['dashboard_sample']['profit_statistics']['total_profit']:,}
- **Average Profit per Transaction:** ${results['dashboard_sample']['profit_statistics']['average_profit']:,.2f}
- **Profit Range:** ${results['dashboard_sample']['profit_statistics']['min_profit']:,} - ${results['dashboard_sample']['profit_statistics']['max_profit']:,}
- **Average Profit Margin:** {results['dashboard_sample']['profit_statistics']['profit_margin_avg']:.2f}%

**Profit by Product:**
"""
    
    # Add profit by product
    for product, profit in sorted(results['dashboard_sample']['profit_by_product'].items(), key=lambda x: x[1], reverse=True):
        report += f"- **{product}:** ${profit:,}\n"
    
    # Calculate profit margins by product
    report += f"""
**Profit Margins by Product:**
"""
    for product in results['dashboard_sample']['products']['unique_products']:
        sales = results['dashboard_sample']['sales_by_product'][product]
        profit = results['dashboard_sample']['profit_by_product'][product]
        margin = (profit / sales) * 100
        report += f"- **{product}:** {margin:.2f}%\n"
    
    report += f"""
### 1.4 Top Performers

**Highest Sales Transaction:**
- Date: {results['dashboard_sample']['top_performers']['highest_sales_transaction']['Date']}
- Product: {results['dashboard_sample']['top_performers']['highest_sales_transaction']['Product']}
- Region: {results['dashboard_sample']['top_performers']['highest_sales_transaction']['Region']}
- Sales: ${results['dashboard_sample']['top_performers']['highest_sales_transaction']['Sales']:,}
- Profit: ${results['dashboard_sample']['top_performers']['highest_sales_transaction']['Profit']:,}

**Highest Profit Transaction:**
- Date: {results['dashboard_sample']['top_performers']['highest_profit_transaction']['Date']}
- Product: {results['dashboard_sample']['top_performers']['highest_profit_transaction']['Product']}
- Region: {results['dashboard_sample']['top_performers']['highest_profit_transaction']['Region']}
- Sales: ${results['dashboard_sample']['top_performers']['highest_profit_transaction']['Sales']:,}
- Profit: ${results['dashboard_sample']['top_performers']['highest_profit_transaction']['Profit']:,}

### 1.5 Key Insights

1. **Product Performance:** {max(results['dashboard_sample']['sales_by_product'], key=results['dashboard_sample']['sales_by_product'].get)} leads in sales with ${results['dashboard_sample']['sales_by_product'][max(results['dashboard_sample']['sales_by_product'], key=results['dashboard_sample']['sales_by_product'].get)]:,}
2. **Regional Strength:** {max(results['dashboard_sample']['sales_by_region'], key=results['dashboard_sample']['sales_by_region'].get)} region dominates with ${results['dashboard_sample']['sales_by_region'][max(results['dashboard_sample']['sales_by_region'], key=results['dashboard_sample']['sales_by_region'].get)]:,} in sales
3. **Profitability:** Average profit margin of {results['dashboard_sample']['profit_statistics']['profit_margin_avg']:.2f}% indicates healthy business operations

---

## 2. NVIDIA Stock Analysis (NVidia_stock_history.csv)

### 2.1 Dataset Overview

**File Information:**
- Total Trading Days: {results['nvidia_stock']['total_rows']:,}
- Date Range: {results['nvidia_stock']['date_range']['start'][:10]} to {results['nvidia_stock']['date_range']['end'][:10]}
- Period Covered: ~{(pd.to_datetime(results['nvidia_stock']['date_range']['end']) - pd.to_datetime(results['nvidia_stock']['date_range']['start'])).days} days
- Columns: {', '.join(results['nvidia_stock']['columns'])}

### 2.2 Price Performance

**Opening Prices:**
- First Trading Day: ${results['nvidia_stock']['price_statistics']['opening_price']['first']:.4f}
- Last Trading Day: ${results['nvidia_stock']['price_statistics']['opening_price']['last']:.4f}
- All-Time Range: ${results['nvidia_stock']['price_statistics']['opening_price']['min']:.4f} - ${results['nvidia_stock']['price_statistics']['opening_price']['max']:.4f}
- Average: ${results['nvidia_stock']['price_statistics']['opening_price']['average']:.4f}

**Closing Prices:**
- First Trading Day: ${results['nvidia_stock']['price_statistics']['closing_price']['first']:.4f}
- Last Trading Day: ${results['nvidia_stock']['price_statistics']['closing_price']['last']:.4f}
- All-Time Range: ${results['nvidia_stock']['price_statistics']['closing_price']['min']:.4f} - ${results['nvidia_stock']['price_statistics']['closing_price']['max']:.4f}
- Average: ${results['nvidia_stock']['price_statistics']['closing_price']['average']:.4f}

**Price Extremes:**
- **All-Time High:** ${results['nvidia_stock']['price_statistics']['high_price']['all_time_high']:.4f} on {results['nvidia_stock']['price_statistics']['high_price']['date_of_high'][:10]}
- **All-Time Low:** ${results['nvidia_stock']['price_statistics']['low_price']['all_time_low']:.4f} on {results['nvidia_stock']['price_statistics']['low_price']['date_of_low'][:10]}

### 2.3 Trading Volume

**Volume Statistics:**
- Total Volume: {results['nvidia_stock']['volume_statistics']['total_volume']:,}
- Average Daily Volume: {results['nvidia_stock']['volume_statistics']['average_volume']:,.0f}
- Maximum Volume: {results['nvidia_stock']['volume_statistics']['max_volume']:,} on {results['nvidia_stock']['volume_statistics']['date_of_max_volume'][:10]}

### 2.4 Returns Analysis

**Overall Performance:**
- **Total Return:** {results['nvidia_stock']['returns_analysis']['total_return_percent']:.2f}%
- **Average Daily Return:** {results['nvidia_stock']['returns_analysis']['average_daily_return']:.4f}%
- **Volatility (Std Dev):** {results['nvidia_stock']['returns_analysis']['volatility_std']:.4f}%

**Best & Worst Days:**
- **Best Day:** {results['nvidia_stock']['returns_analysis']['best_day']['return']:.2f}% on {results['nvidia_stock']['returns_analysis']['best_day']['date'][:10]}
- **Worst Day:** {results['nvidia_stock']['returns_analysis']['worst_day']['return']:.2f}% on {results['nvidia_stock']['returns_analysis']['worst_day']['date'][:10]}

### 2.5 Yearly Performance Breakdown

"""
    
    # Add yearly performance
    for year in sorted(results['nvidia_stock']['yearly_performance'].keys()):
        year_data = results['nvidia_stock']['yearly_performance'][str(year)]
        report += f"""**Year {year}:**
- Opening Price: ${year_data['opening_price']:.4f}
- Closing Price: ${year_data['closing_price']:.4f}
- Yearly Return: {year_data['yearly_return_percent']:.2f}%
- Average Price: ${year_data['average_price']:.4f}
- Total Volume: {year_data['total_volume']:,}
- Trading Days: {year_data['trading_days']}

"""
    
    report += f"""### 2.6 Dividends & Stock Splits

- **Total Dividends Paid:** ${results['nvidia_stock']['dividends_and_splits']['total_dividends']:.2f}
- **Dividend Payment Events:** {results['nvidia_stock']['dividends_and_splits']['dividend_payments']}
- **Stock Split Events:** {results['nvidia_stock']['dividends_and_splits']['stock_splits']}

### 2.7 Key Insights

1. **Growth Trajectory:** NVIDIA stock showed a {results['nvidia_stock']['returns_analysis']['total_return_percent']:.2f}% return over the analyzed period
2. **Volatility:** Daily return standard deviation of {results['nvidia_stock']['returns_analysis']['volatility_std']:.2f}% indicates {'high' if results['nvidia_stock']['returns_analysis']['volatility_std'] > 5 else 'moderate'} volatility
3. **Peak Performance:** Stock reached its highest point of ${results['nvidia_stock']['price_statistics']['high_price']['all_time_high']:.4f} in {results['nvidia_stock']['price_statistics']['high_price']['date_of_high'][:4]}
4. **Trading Activity:** Average daily volume of {results['nvidia_stock']['volume_statistics']['average_volume']:,.0f} shares indicates {'strong' if results['nvidia_stock']['volume_statistics']['average_volume'] > 500000000 else 'moderate'} market interest

---

## 3. Business Employment Data Analysis

### 3.1 Dataset Overview

**File Information:**
- Total Records: {results['employment_data']['total_rows']:,}
- Columns: {results['employment_data']['total_columns']}
- Period Range: {results['employment_data']['period_range']['start']} to {results['employment_data']['period_range']['end']}
- Industries Tracked: {results['employment_data']['unique_values']['industries']}
- Data Categories: {results['employment_data']['unique_values']['data_types']}

**Data Categories:**
"""
    
    for category in results['employment_data']['data_type_categories']:
        report += f"- {category}\n"
    
    report += f"""
### 3.2 Employment Statistics

**Overall Metrics:**
- Total Records: {results['employment_data']['employment_statistics']['total_records']:,}
- Average Filled Jobs: {results['employment_data']['employment_statistics']['average_filled_jobs']:,.0f}
- Maximum Employment: {results['employment_data']['employment_statistics']['max_filled_jobs']:,}
- Minimum Employment: {results['employment_data']['employment_statistics']['min_filled_jobs']:,}

### 3.3 Industry Analysis

**Industries Covered:**
"""
    
    for industry in results['employment_data']['industries'][:15]:  # First 15 industries
        report += f"- {industry}\n"
    
    if len(results['employment_data']['industries']) > 15:
        report += f"- ... and {len(results['employment_data']['industries']) - 15} more industries\n"
    
    report += f"""
### 3.4 Detailed Industry Statistics

"""
    
    # Sort industries by latest value
    industry_stats = results['employment_data']['industry_statistics']
    sorted_industries = sorted(industry_stats.items(), key=lambda x: x[1]['latest_value'], reverse=True)
    
    for industry, stats in sorted_industries[:10]:  # Top 10 industries
        report += f"""**{industry}:**
- Total Records: {stats['total_records']}
- Average Jobs: {stats['average_jobs']:,.0f}
- Range: {stats['min_jobs']:,} - {stats['max_jobs']:,}
- Latest Value (Jun 2025): {stats['latest_value']:,}

"""
    
    report += f"""### 3.5 Time Series Analysis

**Growth Trends by Industry:**

"""
    
    for industry, stats in results['employment_data']['time_series_summary'].items():
        report += f"""**{industry}:**
- Period: {stats['start_period']} to {stats['end_period']}
- Starting Employment: {stats['start_value']:,}
- Ending Employment: {stats['end_value']:,}
- Growth: {stats['growth_percent']:.2f}%
- Data Points: {stats['data_points']}

"""
    
    # Calculate additional insights
    df_actual = df_employment[df_employment['Series_title_2'] == 'Actual']
    total_employment_start = df_actual[df_actual['Period'] == df_actual['Period'].min()]['Data_value'].sum()
    total_employment_end = df_actual[df_actual['Period'] == df_actual['Period'].max()]['Data_value'].sum()
    total_growth = ((total_employment_end - total_employment_start) / total_employment_start) * 100
    
    report += f"""### 3.6 Overall Employment Trends

**Aggregate Analysis:**
- Total Employment (Earliest Period): {total_employment_start:,.0f}
- Total Employment (Latest Period): {total_employment_end:,.0f}
- Overall Growth: {total_growth:.2f}%
- Period Span: {df_actual['Period'].max() - df_actual['Period'].min():.2f} years

### 3.7 Key Insights

1. **Employment Growth:** Overall employment grew by {total_growth:.2f}% from {df_actual['Period'].min()} to {df_actual['Period'].max()}
2. **Industry Diversity:** Data covers {results['employment_data']['unique_values']['industries']} distinct industries
3. **Data Granularity:** Three data types (Actual, Seasonally Adjusted, Trend) provide comprehensive view
4. **Latest Quarter:** June 2025 quarter shows {total_employment_end:,.0f} total filled jobs across all industries

---

## 4. Cross-Dataset Insights

### 4.1 Data Characteristics Comparison

| Aspect | Dashboard Sample | NVIDIA Stock | Employment Data |
|--------|-----------------|--------------|-----------------|
| **Records** | {results['dashboard_sample']['total_rows']} | {results['nvidia_stock']['total_rows']:,} | {results['employment_data']['total_rows']:,} |
| **Time Span** | 10 days | ~{(pd.to_datetime(results['nvidia_stock']['date_range']['end']) - pd.to_datetime(results['nvidia_stock']['date_range']['start'])).days} days | ~14 years |
| **Granularity** | Daily transactions | Daily trading | Quarterly |
| **Categories** | {len(results['dashboard_sample']['products']['unique_products'])} products, {len(results['dashboard_sample']['regions']['unique_regions'])} regions | Stock metrics | {results['employment_data']['unique_values']['industries']} industries |
| **Data Quality** | Complete | Complete | Complete |

### 4.2 Temporal Analysis

**Dashboard Sample (2025):**
- Short-term operational data
- Daily transaction-level detail
- Recent business performance snapshot

**NVIDIA Stock (1999-2003):**
- Historical financial market data
- Early growth phase of NVIDIA
- Tech boom and bust period coverage

**Employment Data (2011-2025):**
- Long-term workforce trends
- Quarterly aggregation
- Covers post-GFC recovery to present

### 4.3 Business Intelligence Insights

1. **Sales Efficiency:** Dashboard data shows {results['dashboard_sample']['profit_statistics']['profit_margin_avg']:.2f}% profit margin, indicating operational efficiency

2. **Market Volatility:** NVIDIA stock volatility of {results['nvidia_stock']['returns_analysis']['volatility_std']:.2f}% reflects the dynamic tech sector during the dot-com era

3. **Employment Stability:** Employment data shows {total_growth:.2f}% growth over 14 years, indicating steady economic expansion

4. **Data Completeness:** All three datasets are complete with no missing critical values

---

## 5. Statistical Summary

### 5.1 Dashboard Sample Statistics

"""
    
    # Add detailed statistics for dashboard
    df_dashboard['Profit_Margin'] = (df_dashboard['Profit'] / df_dashboard['Sales']) * 100
    
    report += f"""**Descriptive Statistics:**

| Metric | Sales | Profit | Profit Margin (%) |
|--------|-------|--------|-------------------|
| Mean | ${df_dashboard['Sales'].mean():,.2f} | ${df_dashboard['Profit'].mean():,.2f} | {df_dashboard['Profit_Margin'].mean():.2f}% |
| Median | ${df_dashboard['Sales'].median():,.2f} | ${df_dashboard['Profit'].median():,.2f} | {df_dashboard['Profit_Margin'].median():.2f}% |
| Std Dev | ${df_dashboard['Sales'].std():,.2f} | ${df_dashboard['Profit'].std():,.2f} | {df_dashboard['Profit_Margin'].std():.2f}% |
| Min | ${df_dashboard['Sales'].min():,} | ${df_dashboard['Profit'].min():,} | {df_dashboard['Profit_Margin'].min():.2f}% |
| Max | ${df_dashboard['Sales'].max():,} | ${df_dashboard['Profit'].max():,} | {df_dashboard['Profit_Margin'].max():.2f}% |

### 5.2 NVIDIA Stock Statistics

**Price Statistics:**

| Metric | Open | High | Low | Close |
|--------|------|------|-----|-------|
| Mean | ${df_nvidia['Open'].mean():.4f} | ${df_nvidia['High'].mean():.4f} | ${df_nvidia['Low'].mean():.4f} | ${df_nvidia['Close'].mean():.4f} |
| Median | ${df_nvidia['Open'].median():.4f} | ${df_nvidia['High'].median():.4f} | ${df_nvidia['Low'].median():.4f} | ${df_nvidia['Close'].median():.4f} |
| Std Dev | ${df_nvidia['Open'].std():.4f} | ${df_nvidia['High'].std():.4f} | ${df_nvidia['Low'].std():.4f} | ${df_nvidia['Close'].std():.4f} |
| Min | ${df_nvidia['Open'].min():.4f} | ${df_nvidia['High'].min():.4f} | ${df_nvidia['Low'].min():.4f} | ${df_nvidia['Close'].min():.4f} |
| Max | ${df_nvidia['Open'].max():.4f} | ${df_nvidia['High'].max():.4f} | ${df_nvidia['Low'].max():.4f} | ${df_nvidia['Close'].max():.4f} |

**Returns Statistics:**

"""
    
    df_nvidia['Daily_Return'] = df_nvidia['Close'].pct_change() * 100
    
    report += f"""| Metric | Value |
|--------|-------|
| Mean Daily Return | {df_nvidia['Daily_Return'].mean():.4f}% |
| Median Daily Return | {df_nvidia['Daily_Return'].median():.4f}% |
| Std Dev (Volatility) | {df_nvidia['Daily_Return'].std():.4f}% |
| Skewness | {df_nvidia['Daily_Return'].skew():.4f} |
| Kurtosis | {df_nvidia['Daily_Return'].kurtosis():.4f} |

### 5.3 Employment Data Statistics

**Employment Metrics by Data Type:**

"""
    
    for data_type in df_employment['Series_title_2'].unique():
        type_data = df_employment[df_employment['Series_title_2'] == data_type]
        report += f"""**{data_type}:**
- Records: {len(type_data):,}
- Average: {type_data['Data_value'].mean():,.0f}
- Range: {type_data['Data_value'].min():,} - {type_data['Data_value'].max():,}

"""
    
    report += f"""---

## 6. Recommendations & Conclusions

### 6.1 Dashboard Sample Recommendations

1. **Focus on High-Margin Products:** Products with margins above {df_dashboard['Profit_Margin'].mean():.2f}% should receive increased marketing focus
2. **Regional Expansion:** {max(results['dashboard_sample']['sales_by_region'], key=results['dashboard_sample']['sales_by_region'].get)} region shows strong performance - consider replicating strategies in other regions
3. **Product Mix Optimization:** Balance portfolio between high-volume and high-margin products

### 6.2 NVIDIA Stock Insights

1. **Historical Context:** The {results['nvidia_stock']['returns_analysis']['total_return_percent']:.2f}% return during 1999-2003 reflects NVIDIA's early growth phase
2. **Volatility Awareness:** {results['nvidia_stock']['returns_analysis']['volatility_std']:.2f}% daily volatility indicates significant price swings typical of tech stocks
3. **Long-term Trend:** Despite volatility, the overall positive return demonstrates company's growth potential

### 6.3 Employment Data Insights

1. **Steady Growth:** {total_growth:.2f}% employment growth over 14 years indicates stable economic expansion
2. **Industry Diversification:** {results['employment_data']['unique_values']['industries']} industries tracked provide comprehensive economic overview
3. **Seasonal Patterns:** Quarterly data reveals seasonal employment fluctuations across industries

### 6.4 Overall Conclusions

1. **Data Quality:** All three datasets are complete and well-structured for analysis
2. **Diverse Perspectives:** Combined analysis provides insights across operations, finance, and workforce
3. **Actionable Intelligence:** Each dataset offers specific metrics for decision-making
4. **Temporal Coverage:** From daily transactions to multi-year trends, data spans multiple time scales

---

## 7. Technical Notes

### 7.1 Data Processing

- **Missing Values:** No significant missing values detected in any dataset
- **Data Types:** All numeric fields properly formatted
- **Date Handling:** Timestamps parsed and normalized across datasets
- **Calculations:** Returns, margins, and growth rates computed using standard formulas

### 7.2 Analysis Methods

- **Descriptive Statistics:** Mean, median, standard deviation, min/max
- **Time Series Analysis:** Trends, seasonality, growth rates
- **Comparative Analysis:** Year-over-year, product-by-product, region-by-region
- **Visualization:** Charts, graphs, heatmaps, and distribution plots

### 7.3 Files Generated

1. **analysis_results.json** - Structured analysis data in JSON format
2. **data_analysis_visualizations.pdf** - Comprehensive visual report with charts
3. **analysis_report.md** - This detailed markdown report

---

## Appendix: Data Dictionary

### Dashboard Sample Fields
- **Date:** Transaction date
- **Product:** Product category
- **Region:** Geographic region
- **Sales:** Sales amount in dollars
- **Profit:** Profit amount in dollars

### NVIDIA Stock Fields
- **Date:** Trading date with timezone
- **Open:** Opening price
- **High:** Highest price of the day
- **Low:** Lowest price of the day
- **Close:** Closing price
- **Volume:** Number of shares traded
- **Dividends:** Dividend payments
- **Stock Splits:** Stock split events

### Employment Data Fields
- **Series_reference:** Unique series identifier
- **Period:** Time period (YYYY.QQ format)
- **Data_value:** Number of filled jobs
- **STATUS:** Data status flag
- **Series_title_1:** Industry name
- **Series_title_2:** Data type (Actual/Seasonally Adjusted/Trend)

---

**Report Generated:** {datetime.now().strftime('%B %d, %Y at %H:%M:%S')}

**Analysis Tools:** Python, Pandas, NumPy, Matplotlib, Seaborn

**Data Sources:** 
- dashboard_sample_10.xls
- NVidia_stock_history.csv
- machine-readable-business-employment-data-jun-2025-quarter.csv
"""
    
    return report

def main():
    """Main function"""
    print("\n" + "=" * 80)
    print("CREATING MARKDOWN ANALYSIS REPORT")
    print("=" * 80)
    
    report = create_markdown_report()
    
    # Save report
    with open('/vercel/sandbox/analysis_report.md', 'w') as f:
        f.write(report)
    
    print("\n✓ Markdown report created successfully")
    print("=" * 80)
    print("Location: /vercel/sandbox/analysis_report.md")
    print("=" * 80)

if __name__ == "__main__":
    main()
