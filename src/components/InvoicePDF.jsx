import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: "#fff",
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    width: 200,
    textAlign: "right",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1e1e1e",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7288",
  },
  status: {
    fontSize: 14,
    padding: "8 16",
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
    color: "#1e1e1e",
    textTranform: "uppercase",
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  statusPaid: {
    backgroundColor: "#f0f0f0",
    color: "#15803d",
  },
  statusPending: {
    backgroundColor: "#f0f0f0",
    color: "#f59e0b",
  },
  section: {
    marginBottom: 30,
  },
  grid: {
    flexDirection: "row",
    gap: 30,
  },
  column: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#6b7288",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  value: {
    fontSize: 14,
    color: "#1e1e1e",
    marginBottom: 4,
  },
  table: {
    marginTop: 30,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: "12 16",
    borderRadius: 8,
    marginBottom: 8,
  },
  tableHeaderText: {
    fontSize: 12,
    color: "#6b7288",
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    padding: "12 16",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tableCell: {
    fontSize: 14,
    color: "#1e1e1e",
  },
  col1: { width: "40%" },
  col2: { width: "20%", textAlign: "center" },
  col3: { width: "20%", textAlign: "right" },
  col4: { width: "20%", textAlign: "right" },
  totalSection: {
    marginTop: 30,
    backgroundColor: "#f0f0f0",
    padding: 24,
    borderRadius: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 14,
    color: "#ffffff",
    opacity: 0.7,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    textAlign: "center",
    color: "#6b7288",
    fontSize: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
});

export const InvoicePDF = ({ invoice }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "paid":
        return styles.statusPaid;
      case "pending":
        return styles.statusPending;
      default:
        return {};
    }
  };

  return (
    <Document>
      <page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>INVOICE #{invoice.id}</Text>
            <Text style={styles.subtitle}>{invoice.projectDescription}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={[styles.status, getStatusStyle(invoice.status)]}>
              {invoice.status}
            </Text>
          </View>
        </View>

        {/* Billing details */}
        <View style={styles.section}>
          <View style={styles.grid}>
            <View style={styles.column}>
              <Text style={styles.label}>Bill From</Text>
              <Text style={styles.value}>{invoice.billFrom.streetAddress}</Text>
              <Text style={styles.value}>{invoice.billFrom.city}</Text>
              <Text style={styles.value}>{invoice.billFrom.postCode}</Text>
              <Text style={styles.value}>{invoice.billFrom.country}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Bill To</Text>
              <Text style={styles.value}>{invoice.clientName}</Text>
              <Text style={styles.value}>{invoice.billTo.streetAddress}</Text>
              <Text style={styles.value}>{invoice.billTo.city}</Text>
              <Text style={styles.value}>{invoice.billTo.postCode}</Text>
              <Text style={styles.value}>{invoice.billTo.country}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Sent To</Text>
              <Text style={styles.value}>{invoice.billTo.clientEmail}</Text>
            </View>
          </View>
        </View>

        {/* Invoice details */}
        <View style={styles.section}>
          <View style={styles.grid}>
            <View style={styles.column}>
              <Text style={styles.label}>Invoice Date</Text>
              <Text style={styles.value}>
                {format(new Date(invoice.invoiceDate), "MM/dd/yyyy")}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Due Date</Text>
              <Text style={styles.value}>
                {format(new Date(invoice.dueDate), "MM/dd/yyyy")}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Payment Terms</Text>
              <Text style={styles.value}>{invoice.paymentTerms}</Text>
            </View>
          </View>
        </View>

        {/* Items table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.col1]}>Item Name</Text>
            <Text style={[styles.tableHeaderText, styles.col2]}>Qty</Text>
            <Text style={[styles.tableHeaderText, styles.col3]}>Price</Text>
            <Text style={[styles.tableHeaderText, styles.col4]}>Total</Text>
          </View>
          {invoice.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.col1]}>{item.name}</Text>
                <Text style={[styles.tableCell, styles.col2]}>{item.qty}</Text>
                <Text style={[styles.tableCell, styles.col3]}>${item.price.toFixed(2)}</Text>
                <Text style={[styles.tableCell, styles.col4]}>${item.total.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={styles.totalSection}>
            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Amount Due</Text>
                <Text style={styles.totalAmount}>${invoice.amount.toFixed(2)}</Text>
            </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
            This is an auto-generated invoice. No signature required.
        </Text>
      </page>
    </Document>
  );
};
