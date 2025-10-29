import streamlit as st
import pandas as pd

# Load datasets
rain = pd.read_csv("rainfall.csv")
crops = pd.read_csv("crops.csv")

st.set_page_config(page_title="Project Samarth", page_icon="🌾")

st.title("🌾 Project Samarth: Intelligent Q&A on India's Agri & Climate Data")

st.markdown("""
Ask questions about rainfall and crop production.
Example queries:
- Compare rainfall between Karnataka and Tamil Nadu
- Show top crops in Karnataka in 2020
""")

query = st.text_input("Ask your question:")

if query:
    query_lower = query.lower()

    # Simple logic 1: Compare rainfall between two states
    if "rainfall" in query_lower and "compare" in query_lower:
        states = [s for s in rain["State"].unique() if s.lower() in query_lower]
        if len(states) == 2:
            s1, s2 = states
            df1 = rain[rain["State"] == s1]
            df2 = rain[rain["State"] == s2]
            st.subheader(f"Rainfall Comparison: {s1} vs {s2}")
            st.write(pd.concat([df1, df2]))
            st.info("📊 Source: IMD dataset (sample from data.gov.in)")
        else:
            st.warning("Please mention two states to compare rainfall.")

    # Simple logic 2: Show top crops for a state
    elif "crop" in query_lower or "production" in query_lower:
        for state in crops["State"].unique():
            if state.lower() in query_lower:
                df = crops[crops["State"] == state]
                latest_year = df["Year"].max()
                top_crops = df[df["Year"] == latest_year].sort_values("Production_Tonnes", ascending=False)
                st.subheader(f"Top Crops in {state} ({latest_year})")
                st.write(top_crops)
                st.info("🌾 Source: Ministry of Agriculture dataset (sample from data.gov.in)")
                break
        else:
            st.warning("Please mention a state name to show its crop production.")
    else:
        st.warning("I couldn’t understand. Try asking about rainfall or crop production.")
