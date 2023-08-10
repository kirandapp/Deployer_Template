Path=$1
NETWORK=$2
ADDRESS=$3

echo "hello"

echo $NETWORK

args_count=$4  # The length of the arguments

# Loop to extract additional arguments
for ((i = 0; i < args_count; i++)); do
  arg_index=$((i + 5))            # Calculate the index of the argument
  echo $((i + 5))
  current_arg="${!arg_index}"     # Extract the argument using the calculated index
  # You can now use the `current_arg` variable as needed.
done

# Print all the arguments
echo $1 $2 $3 "${@:5}"

# Call npx hardhat verify with all the arguments
npx hardhat verify --contract "$Path" --network "$NETWORK" "$ADDRESS" "${@:5}"

# Check if the verification was successful (exit code 0)
if [ $? -eq 0 ]; then
  # Extract the contract name from the path
  contract_name=$(basename "$Path" | cut -d ':' -f 1)
  echo $contract_name
  # Remove the verified contract file
  full_path="./contracts/Generated/$contract_name"
  if [ -f "$full_path" ]; then
    rm -f "$full_path"
    echo "Verified contract file removed: $contract_name"
  else
    echo "File not found: $contract_name"
  fi

  # Remove the contract details from contractDetails.json
  node -e "const fs = require('fs'); const contractDetails = JSON.parse(fs.readFileSync('contractDetails.json')); delete contractDetails['$ADDRESS']; fs.writeFileSync('contractDetails.json', JSON.stringify(contractDetails, null, 2));"
fi

# Path=$1
# NETWORK=$2
# ADDRESS=$3

# echo "hello"

# echo $NETWORK

# ARG1=$4
# ARG2=$5
# ARG3=$6
# ARG4=$7

# echo $1 $2 $3 $4 $5 $6 $7
# echo $NETWORK $ADDRESS $ARG1 $ARG2 $ARG3 $ARG4

# npx hardhat verify --contract $Path --network $NETWORK $ADDRESS "$ARG1" "$ARG2" "$ARG3" "$ARG4"