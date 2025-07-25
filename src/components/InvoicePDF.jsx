import React from 'react'

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
        borderTopColor: "#e5e7eb"
    },
})

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
            <page size='A4' style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.title}>INVOICE #{invoice.id}</Text>
                        <Text style={styles.subtitle}>{invoice.projectDescription}</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Text style={[styles.status, getStatusStyle(invoice.status)]}>{invoice.status}</Text>
                    </View>
                </View>

                {/* Billing details */}
                <View style={styles.section}>
                    <View style={styles.grid}>
                        <View style={styles.column}>
                            <Text style={styles.label}>Bill Form</Text>
                            <Text style={styles.value}>{invoice.billFrom.streeAddress}</Text>
                            <Text style={styles.value}>{invoice.billFrom.city}</Text>
                            <Text style={styles.value}>{invoice.billFrom.postCode}</Text>
                            <Text style={styles.value}>{invoice.billFrom.country}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label}>Bill To</Text>
                            <Text style={styles.value}>{invoice.billTo.clientName}</Text>
                            <Text style={styles.value}>{invoice.billTo.streeAddress}</Text>
                            <Text style={styles.value}>{invoice.billTo.city}</Text>
                            <Text style={styles.value}>{invoice.billTo.postCode}</Text>
                            <Text style={styles.value}>{invoice.billTo.country}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label}>Ship To</Text>
                            <Text style={styles.value}>{invoice.billTo.clientName}</Text>
                        </View>
                    </View>
                </View>

                {/* Invoice details */}
                <View style={styles.section}>
                    <View style={styles.grid}></View>
                </View>
            </page>
        </Document>
    )
}
