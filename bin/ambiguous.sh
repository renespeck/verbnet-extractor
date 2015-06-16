#!/usr/bin/env bash

cd "$(dirname "$0")";

echo "===== Ditransitives ====="

echo "----- Verbs common to 'ditrans_to' and 'ditrans_for' -----"
cat ../out/ditrans_to.json ../out/ditrans_for.json | sort | uniq -d

echo "----- Verbs common to 'ditrans_be' and 'ditrans_for' -----"
cat ../out/ditrans_be.json ../out/ditrans_for.json | sort | uniq -d

echo "----- Verbs common to 'ditrans_be' and 'ditrans_to' -----"
cat ../out/ditrans_be.json ../out/ditrans_to.json | sort | uniq -d

